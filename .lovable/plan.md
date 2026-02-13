

## Admin User Management with Role-Based Access

Add a "User Management" section to the admin dashboard where admins can view all admin users, invite new ones, and assign roles (Super Admin vs Admin). Super Admins can delete any user; Admins can only remove themselves.

### What You'll See

**New "Users" tab in the admin sidebar:**
- A table listing all admin users (email, role, date added)
- An "Invite User" button that creates a new account with email + password + role assignment
- Role displayed as a badge (Super Admin / Admin)
- Delete button visible on each row:
  - Super Admins see delete on every row (except themselves, optionally)
  - Admins only see a "Remove My Account" option for their own row

**Role indicator in the sidebar:**
- The current user's role shown below their name in the sidebar footer

### How Roles Work

| Action | Super Admin | Admin |
|--------|------------|-------|
| View all admin users | Yes | Yes |
| Invite new users | Yes | Yes |
| Assign roles | Yes | No |
| Delete other users | Yes | No |
| Delete own account | Yes | Yes |

---

### Technical Details

**1. Database migration -- Role enum, user_roles table, and security function**

Create the role system following security best practices (roles in a separate table, never on the user profile):

```sql
-- Role enum
CREATE TYPE public.app_role AS ENUM ('super_admin', 'admin');

-- Roles table
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: any authenticated user can read roles
CREATE POLICY "Authenticated users can read roles"
  ON public.user_roles FOR SELECT
  TO authenticated USING (true);

-- RLS: only super_admins can insert roles
CREATE POLICY "Super admins can insert roles"
  ON public.user_roles FOR INSERT
  TO authenticated WITH CHECK (public.has_role(auth.uid(), 'super_admin'));

-- RLS: only super_admins can update roles
CREATE POLICY "Super admins can update roles"
  ON public.user_roles FOR UPDATE
  TO authenticated USING (public.has_role(auth.uid(), 'super_admin'));

-- RLS: super_admins can delete any role; admins can only delete their own
CREATE POLICY "Role deletion policy"
  ON public.user_roles FOR DELETE
  TO authenticated USING (
    public.has_role(auth.uid(), 'super_admin')
    OR user_id = auth.uid()
  );
```

**2. Edge function -- `manage-admin-users`**

A backend function to handle user creation and deletion securely using the service role key (since these operations require admin-level Supabase auth access):

- `POST /manage-admin-users` with `{ action: "create", email, password, role }` -- creates a new auth user and inserts their role
- `POST /manage-admin-users` with `{ action: "delete", userId }` -- deletes an auth user (validates caller is super_admin, or is deleting themselves)
- `GET /manage-admin-users` -- lists all users from `auth.users` joined with `user_roles`

**3. New hook -- `src/hooks/useUserRole.ts`**

A hook that fetches the current user's role from `user_roles` and exposes `role` and `isSuperAdmin` for use throughout the admin UI.

**4. New page -- `src/pages/admin/UserManagement.tsx`**

- Table of all admin users with columns: Email, Role, Date Added, Actions
- "Invite User" dialog with email, temporary password, and role dropdown
- Delete button logic based on the current user's role
- Confirmation dialog before any deletion

**5. Updates to existing files**

- **`src/pages/AdminDashboard.tsx`**: Add "Users" nav item with a Users icon
- **`src/App.tsx`**: Add route `/admin/dashboard/users` pointing to `UserManagement` inside `AdminDashboard`
- **`src/components/ProtectedRoute.tsx`**: No changes needed (role checks happen within the user management page itself)

**6. Seed the first Super Admin**

After the migration runs, the currently logged-in user will need to be manually assigned the `super_admin` role. The migration will include an insert for this if there's a known user, or the edge function will handle bootstrapping (if no roles exist, the first authenticated user to access user management gets super_admin).

