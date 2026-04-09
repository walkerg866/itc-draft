

## Plan: Restrict Storage Policies to Admin Roles

**Problem**: Storage bucket policies for `downloads` and `site-images` allow any authenticated user to delete or update files. Only admins/super_admins should have this access.

### Steps

1. **Create a database migration** that drops the four permissive storage policies and replaces them with role-checked versions:
   - `Authenticated users can delete download files` → add `has_role` check for admin/super_admin
   - `Authenticated users can update download files` → add `has_role` check
   - `Authenticated users can delete site images` → add `has_role` check
   - `Authenticated users can update site images` → add `has_role` check

2. **Mark the security finding as fixed.**

### Technical Details

Each replacement policy will use a USING expression like:
```sql
bucket_id = 'downloads' AND (
  public.has_role(auth.uid(), 'admin'::app_role) OR
  public.has_role(auth.uid(), 'super_admin'::app_role)
)
```

Same pattern for the `site-images` bucket policies.

