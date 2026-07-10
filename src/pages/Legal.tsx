import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SectionReveal from "@/components/SectionReveal";
import { CookieSettingsButton } from "@/components/CookieConsent";
import SEO from "@/components/SEO";

const Legal = () => {
  const { hash } = useLocation();
  const [tab, setTab] = useState(hash === "#terms" ? "terms" : "privacy");

  useEffect(() => {
    setTab(hash === "#terms" ? "terms" : "privacy");
    window.scrollTo(0, 0);
  }, [hash]);

  return (
    <div className="container py-16 max-w-4xl">
      <SEO title={"Legal: Privacy Policy & Terms | Indiana Tube"} description={"Privacy policy and terms of service for Indiana Tube Corporation."} path={"/legal"} />
      <SectionReveal>
        <h1 className="font-heading text-4xl font-bold mb-8 text-foreground">Legal</h1>

        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="mb-8">
            <TabsTrigger value="privacy">Privacy Policy</TabsTrigger>
            <TabsTrigger value="terms">Terms of Service</TabsTrigger>
          </TabsList>

          <TabsContent id="privacy" value="privacy" className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-sm italic text-muted-foreground/70 mb-6">
              Last Modified: 5/7/2026
            </p>

            <h2 className="text-2xl font-heading font-bold text-foreground mt-0 underline">Privacy Policy</h2>

            <h3 className="text-xl font-heading font-semibold text-foreground">Contact Information</h3>
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:privacy@indianatube.com" className="text-primary hover:underline">
                privacy@indianatube.com
              </a>
              <br />
              <strong>Phone:</strong> 812.424.9028
              <br />
              <strong>Mail:</strong> ATTN: Privacy Representative
              <br />
              2100 Lexington Rd
              <br />
              Evansville, IN 47720
            </p>
            <p>
              <strong>Website:</strong> indianatube.com
              <br />
              <strong>Company Name:</strong> Indiana Tube Corporation ("Company," "us," "we," or "our")
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">A. Introduction</h3>
            <p>Welcome to the Company's Privacy Policy.</p>
            <p>
              We respect your privacy. This Privacy Policy describes how we collect, use, and disclose information we
              receive from users of the Services (collectively, "you" or "users"). Our Services collectively include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Our website (identified above), or any other website on which we place this Privacy Policy, referred to
                herein as the "Website";
              </li>
              <li>
                Our mobile or other applications (referred to herein as the "Applications"), if any, that link or
                reference this privacy policy;
              </li>
              <li>
                Our social media pages that we manage and control (in conjunction with the privacy policy for those
                social media pages); and
              </li>
              <li>
                Our other digital, electronic, and/or paper-based means of collecting information which refer to this
                Privacy Policy with respect to the collection and use of your personal information.
              </li>
            </ul>
            <p>
              Company, its affiliates, and Company's service providers make no representations that the online services
              are designed for, applicable to, intended and appropriate for, or available to users in locations outside
              the United States. Accessing the online service from territories where the content in the online services
              is illegal is prohibited. If you choose to access or use the online services from a location outside the
              United States, you do so on your own initiative and risk, and you are solely responsible for compliance
              with local laws.
            </p>
            <p>
              We have adopted this Privacy Policy to explain what information may be collected when you access the
              Website, use any of our Applications, or access or use any of our social media pages or other Services;
              how we and others use this information; under what circumstances we may disclose the information to third
              parties; and the instances in which we may allow third parties to collect information directly. Depending
              on your activities when using or accessing our Services, you may from time-to-time be required to agree
              to additional terms and conditions. Without limiting the foregoing, our Services include any promotion,
              contest, or sweepstakes which refers to this Privacy Policy with respect to the collection and use of
              your information.
            </p>
            <p>
              This Privacy Policy applies regardless of whether you use our Services via a computer, mobile device, or
              any other platform or equipment (collectively, your "Equipment"). This Privacy Policy also applies only
              to information we collect through our Services, and does not apply to our collection of information from
              other sources.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">B. Modifications to this Privacy Policy</h3>
            <p>
              We generally keep this Privacy Policy posted on our Website and accessible in our Applications. You
              should review this Privacy Policy frequently, as it may change from time to time without notice. Any
              changes will be effective immediately upon the posting of the revised Privacy Policy. WHEN YOU USE OUR
              SERVICES, YOU AGREE TO THIS PRIVACY POLICY AND CONSENT TO THE USE OF INFORMATION AS DESCRIBED IN THIS
              PRIVACY POLICY. IF YOU DO NOT AGREE TO THIS PRIVACY POLICY, OR TO ANY CHANGES WE MAY SUBSEQUENTLY MAKE,
              IMMEDIATELY STOP USING OUR SERVICES. Please note, however, that if we decide to use your personal data
              in a manner materially different than what is provided in this Privacy Policy or what we advised at the
              time it was collected, we may notify you of this change by email to the last email address provided to
              us.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">C. Information We Collect</h3>
            <p>We may collect certain kinds of information when you use our Services:</p>
            <p>
              <strong>(1) Personal Data:</strong> Our definition of personal data includes any information that can
              actually be used to specifically identify or contact you, such as your name, personal address, email
              address, or phone number. In certain circumstances, we may request, allow, or otherwise provide you an
              opportunity to submit your personal data in connection with a feature, program, promotion, or some other
              aspect of our Services. For instance, you may: (a) provide your name, mail/shipping address, email
              address, credit card number, and phone number when registering with our Services, including the use of
              our online store, or in connection with a contest entry; (b) provide certain demographic information
              about yourself (e.g., age, gender, purchase preference, usage frequency) when using our Services,
              participating in a survey or poll, or joining a club; or (c) post a general comment and/or recommendation
              on our Services. Certain information may not be personal data when standing alone (e.g., your age), but
              may become so when combined with other information (e.g., your age and name). Whether or not you provide
              this information is your choice; in many instances, however, this type of information is required to
              participate in the particular activity, realize a benefit we may offer, or gain access to certain content
              or features available through our Services.
            </p>
            <p>
              <strong>(2) Usage Data:</strong> Our definition of usage data is any information that does not personally
              identify you (also referred to herein as "non-personal data") that may be automatically collected anytime
              you visit a Company webpage or use another Service, including information such as browser type and
              referring websites. Usage data can include certain personal data that has been de-identified; that is,
              information that has been rendered anonymous. We obtain usage data about you from information that you
              provide us, either separately or together with your personal data. We also automatically collect certain
              usage data from you when you access our Services with your Equipment. This information can include, among
              other things, information about your mobile device, other applications, or software that you are using,
              the wireless carrier, any IP addresses, the type of browser you are using (e.g., Internet Explorer,
              Firefox, Safari, Opera), the websites you were on previously, the third party website from which your
              visit originated, the operating system you are using (e.g., Vista, Windows XP, Mac OS, Android, iPhone)
              on your Equipment, the domain name of your Internet service provider (e.g., CenturyLink, Google, Cox,
              AOL), the search terms you use on our Services, the specific web pages you visit, how much you use our
              Services, and the duration of your visits.
            </p>
            <p>
              <strong>(3) Location Data:</strong> When you use our Services, particularly our Application(s), we may
              automatically collect certain Equipment (mobile device) specific information. This includes the general
              or specific location of your Equipment through GPS, Bluetooth, or WiFi signals. Before we collect or send
              location-specific information, it is our practice to ask for your consent. In some instances, your
              operating system may not allow you to install an Application without giving us consent. In all instances,
              you may withdraw your consent by disabling location features for your Equipment – the Application will
              still work, although certain location features may not function.
            </p>
            <p>
              <strong>(4) Financial Data:</strong> Our definition of financial data is any information needed to
              facilitate the purchase of items or services on the Services, including credit card information.
              Financial data may constitute personal data, depending on the circumstances of its collection and use. We
              do not always collect financial data.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">D. How We Use & Disclose the Information Collected</h3>
            <p>
              <strong>(1) Personal Data:</strong> The personal data you voluntarily submit to us is generally used to
              carry out your requests, respond to your inquiries, better serve you, or in other ways naturally
              associated with the circumstances in which you provided the information. We may also use this information
              to later contact you for a variety of reasons—such as customer service, providing you promotional
              information for our products or those of our parent company, subsidiaries, or other related or affiliated
              companies ("affiliated companies") or other partner companies—or to communicate with you about content or
              other information you have posted or shared with us via use of our Services. In addition, we may share
              your personal data with our affiliated companies from time to time. Any such affiliated companies will
              process your personal data in accordance with the disclosures in this Privacy Policy. In some cases, the
              affiliated companies may present you with additional privacy policies applicable to the processing of
              your personal data, in which case, your personal data will be processed in accordance with such privacy
              policies.
            </p>
            <p>
              You may opt-out from receiving future promotional information from our affiliated companies, or partner
              companies, or direct that we do not share your information with any affiliated companies or partner
              companies, as set forth below.
            </p>
            <p>
              In certain instances, we may also share your personal data with third parties to provide you with
              services, provide you promotional information for our products and events, sell tickets, or perform
              functions on our behalf (or on behalf of our affiliated companies) or access the Services (e.g., vendors
              that process credit card orders, deliver our merchandise, administer our promotions, provide us marketing
              or promotional assistance, analyze our data, assist us with customer service). These third parties agree
              to use this information, and we share information with them, only to carry out our requests or provide
              services as described above.
            </p>
            <p>
              In addition, we may share your personal data with participating sponsors to a program or promotion (e.g.,
              a sweepstakes or contest) you enter via our Services, and with third parties who assist us in using the
              content or other information you have posted or shared with us via our Services (e.g., production
              companies we may use). Further, we may share your personal data with third parties such as our
              co-promotional partners and others with whom we have marketing or other relationships. Except as provided
              in this Privacy Policy, our Terms of Use, or as set forth when you submit the information, your personal
              data will not be shared or sold to any third parties without your prior approval.
            </p>
            <p>
              <strong>(2) Usage Data:</strong> We use usage data in a variety of ways. For example, we may use usage
              data to evaluate use of our Services (e.g., visits to our Website, use of our Applications), analyze site
              traffic, follow your purchases, gauge coupon redemption rates, understand customer needs and trends,
              carry out targeted promotional activities, and improve our Services. We may use your usage data by itself
              or aggregate it with information we have obtained from others. We may, among other things, share your
              usage data with our affiliated companies, allow third parties to collect such information directly from
              you, and/or sell the usage data to third parties to achieve these and any other business objectives
              (e.g., generate revenue, form alliances). It is, however, important to remember that your usage data is
              anonymous information that does not personally identify you, directly or indirectly.
            </p>
            <p>
              <strong>(3) General Uses and Disclosures:</strong> We use and share the information, including personal
              data, we collect from users for the purposes described below. To perform the following tasks, we may
              transfer your data to countries outside the United States using appropriate safeguards when necessary.
              When necessary, we will obtain your additional consent before using your data for these purposes:
            </p>
            <p>
              <em>Provision of Services to Website Users.</em> If you use the Website, we will use your information to
              process and respond to your requests, comments, inquiries, online chat messages, and other forms you
              submit through the Website.
            </p>
            <p>
              <em>Processing Purchases.</em> We use your Financial Data to process any purchases made on the Services,
              including disclosure of your Financial Data to third party payment processors.
            </p>
            <p>
              <em>Improving our Services.</em> We use your information to enhance our understanding of our users'
              preferences and optimize the performance of the Services.
            </p>
            <p>
              <em>Disclosures to Service Providers.</em> We share your information with third party service providers
              that assist us with hosting and maintaining the Services, processing credit card information, analyzing
              online activity on the Services, marketing our services, managing our daily business operations, and/or
              delivering the Services. We share only the minimum amount of personal data with these service providers
              that they need to perform their tasks. We also enter into contracts with these service providers that
              require them to protect personal data.
            </p>
            <p>
              <em>Compliance with Legal Obligations.</em> We will share your information with law enforcement,
              government officials, regulatory agencies, or other parties when we are required to do so by applicable
              law. We will also disclose your information to comply with a judicial proceeding, court order, subpoena,
              or legal process.
            </p>
            <p>
              <em>Protection of Individual's Vital Interests.</em> In emergency situations, we will use or share your
              information when doing so is necessary to protect an interest that is essential for an individual's life.
            </p>
            <p>
              <em>Other Legitimate Interests.</em> We will use and disclose your information when necessary for our
              legitimate interests, as long as such interests are not overridden by our users' interests, rights, and
              freedoms with respect to their personal data.
            </p>
            <p>
              <strong>(4) Legal Bases for Processing:</strong> The legal bases for processing your personal data for
              the purposes described above or elsewhere in this Privacy Policy, including in Section C below, are,
              without limitation, that (1) it is necessary to perform a contract with you (sale of goods or services)
              or in order to take steps at your request prior to entering into a contract; (2) it is necessary to
              comply with a legal obligation (such as notifying you of Privacy Policy changes); and/or (3) it is
              necessary for the pursuit of our legitimate interests or those of a third party.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">E. Cookies and Preference Based Advertising</h3>
            <p>
              <strong>(1) Cookies and Web Beacons:</strong> We may receive and store certain types of usage data
              whenever you interact with us. For example, like many websites, we may use cookies, web beacons (also
              called "clear gifs" or "pixel tags"), and embedded scripts to obtain certain types of information when
              you use or access our Services. Cookies are small files that we transfer to your computer's hard drive or
              your web browser memory to enable our systems to recognize your browser and to provide convenience and
              other features to you. Cookies and other user analytics mechanisms (e.g., local shared objects), by
              themselves, do not tell us your email address or other personal data unless you choose to provide this
              information to us by, for example, registering at the Website. We may use cookies and other user
              analytics mechanisms, including "persistent cookies," which will remain on your computer even after you
              close your browser, to understand website usage and to improve the content and offerings on the Services.
              For example, we may use cookies to personalize your experience and to save your password in
              password-protected areas. We also may use cookies to offer you products, programs, or services. While
              most browsers are set to accept cookies and other analytics devices by default, you can set yours to
              refuse analytics devices or to alert you before accepting them. However, by disabling analytics devices,
              you may not have access to the entire set of features of the Services. Your browser manufacturer has
              information on changing the default setting for your specific browser.
            </p>
            <p>
              Web beacons are tiny graphics with a unique identifier, similar in function to cookies, and may be used
              to analyze the online movements of users, when an email has been opened, and to provide other
              information. Web beacons can recognize certain types of information on your computer such as cookies, the
              time and date a page is viewed, and a description of the page where the web beacon is placed. We may use
              web beacons to improve your experience with the Website, including to provide you with content customized
              to your interests and to understand whether users read email messages and click on links contained within
              those messages so that the Website can deliver relevant content. Our web beacons may collect some contact
              information (for example, the email address associated with an email message that contains a web beacon).
            </p>
            <p>
              Other examples of the information we collect and analyze in this manner include: the Internet Protocol
              (IP) address used to connect your Equipment to the Internet; computer and connection information such as
              browser type and version, operating system, and platform; your activities on our Services, including the
              products you view or searched for, as well as the URL you come from and go to next (whether this URL is
              on our Website or not); and cookie number.{" "}
              <strong>
                IT IS IMPORTANT TO NOTE THAT THE COOKIES AND WEB BEACONS THAT WE USE DO NOT CONTAIN AND ARE NOT TIED TO
                PERSONAL DATA OR PERSONALLY IDENTIFIABLE INFORMATION ABOUT YOU. WE DO NOT USE COOKIES, BEACONS, OR
                OTHER SIMILAR TOOLS TO DIRECTLY TRACK YOU. THIS INFORMATION IS USED IN AN AGGREGATED MANNER TO HELP US
                IMPROVE THE ONLINE EXPERIENCE.
              </strong>
            </p>
            <p>
              If you are concerned about the storage and use of cookies, you may block or limit the storage of cookies
              via browser controls or other software (we do not make any promise that our Services will recognize or be
              able to work with any such browser controls/software – see below for Do Not Track options). You may also
              be able to delete cookies manually from your Equipment through your internet browser, operating system,
              or other programs. Please note, however, that some portions of our Services will not function properly or
              be available if you are able and do block and/or delete cookies.
            </p>
            <p>
              In addition to the other uses described in this Privacy Policy, the Website uses cookies and other
              analytics technologies to enhance user experience, display targeted ads, and to analyze performance, user
              activity, and traffic on our website. We may also share personal information about your activity on our
              website with our advertising, analytics, and business partners.
            </p>
            <p>
              For more information about our cookies, and to Manage Cookie Preferences,{" "}
              <CookieSettingsButton className="text-primary hover:underline underline" />.
            </p>
            <p>
              <strong>(2) Preference Based Advertising:</strong> We may work with third parties, including advertising
              companies and website analysis firms, who use cookies and web beacons to collect usage data when you use
              our Services, including, without limitation, our Website and third party sites. This usage data,
              collected through cookies and web beacons, is typically used by these third party advertising companies
              (i.e., advertising networks) to serve you with advertisements while on third party sites tailored to meet
              your preferences and needs. If you do not wish to participate in this activity, go to youradchoices.com
              and follow the simple opt-out process.
            </p>
            <p>
              A couple of important notes about this opt-out tool: (1) it includes all the advertising networks that we
              may work with, but also many that we do not work with; and (2) it may rely on cookies to ensure that a
              given advertising network does not collect information about you ("Opt-out Cookies") – an explanation of
              how Opt-out Cookies work can be found on youradchoices.com. Therefore, if you use different Equipment,
              change web browsers, or delete these Opt-out Cookies from your computer, you will need to perform the
              opt-out task again.
            </p>
            <p>
              <strong>Do Not Track Features:</strong> Certain browsers may offer you the option of providing notice to
              websites that you do not wish for your online activities to be analyzed for preference-based advertising
              purposes ("DNT Notice"). Some browsers are, by default, set to provide a DNT Notice, whether or not that
              reflects your preference. Providing DNT Notice is often touted as a means to ensure that cookies, web
              beacons, and similar technology are not used for preference-based advertising purposes – that is, to
              restrict the collection of non-personally identifiable information about your online activities for
              advertising purposes. Unfortunately, given how preference-based advertising works, DNT Notices may not
              effectively accomplish this goal. For this and a variety of other reasons, with respect to our Website,
              we do not take any action based on browser based DNT Notices. Rather, if you do not wish to participate
              in preference-based advertising activities, you should follow the simple opt-out process identified
              above.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">F. Other Uses & Information</h3>
            <p>
              <strong>(1) Social Networks:</strong> We may offer you the ability to create or login to your account
              with us through accounts you may have with various social network platforms, such as Facebook or Twitter
              (each a "Social Network Account"). To do so, you may be required to provide, or allow our Services to
              access, your Social Network Account login information. By granting us access to your Social Network
              Account, you understand and agree that we may access, make available, and store any content that you
              have provided to and stored in your Social Network Account. You may be able to restrict what information
              is shared and how it is used through privacy and other Social Network Account settings. Also, depending
              on the privacy settings you have set in your Social Network Account, personal data may be shared with us
              and made available through our Services and to our users.
            </p>
            <p>
              <strong>(2) Email Communications:</strong> If you send us an email with questions or comments, we may use
              your personal data to respond to your questions or comments, and we may save your questions or comments
              for future reference. For security reasons, we do not recommend that you send non-public personal
              information, such as passwords, social security numbers, credit card numbers, or bank account
              information, to us by email. We may send you emails for a variety of reasons – such as emails in response
              to your request for a particular service or your registration for a feature that involves email
              communications, that relate to purchases you have made with us (e.g., product updates, customer support),
              about our other products, services, or events, or when you consent to being contacted by email for a
              particular purpose. In certain instances, we may provide you with the option to set your preferences for
              receiving email communications from us – that is, agree to some communications but not others. You may
              "opt-out" of receiving future commercial emails from us by clicking the "unsubscribe," "opt-out," or
              similar link included at the bottom of most emails we send, or as provided below; we reserve the right,
              however, to send you transactional emails such as customer service communications.
            </p>
            <p>
              <strong>(3) Calls and Text Communications:</strong> If you choose to communicate with Company through
              text messages (SMS/MMS) or subscribe to receive information from Company through an online service that
              includes text messaging, you consent to us processing your phone number. You may also consent to receive
              automated calls or texts as set forth in our Terms of Use. Messages may include marketing to the number
              provided, even if the number appears on a federal or state do not call list. Consent to receive automated
              calls or texts is not required as a condition of using the Services. You agree to the Terms of Use. Calls
              or texts may be available for consumers of select mobile carriers and devices. Message and data rates may
              apply. You can opt-out at any time.
            </p>
            <p>
              <strong>(4) Transfer of Assets:</strong> As we continue to develop our business, we may sell or purchase
              assets. If another entity acquires us or all (or substantially all) of our assets, the personal data and
              non-personal data we have about you will be transferred to and used by this acquiring entity, though we
              will take reasonable steps to ensure that your preferences are followed. Also, if any bankruptcy or
              reorganization proceeding is brought by or against us, all such information may be considered an asset of
              ours and as such may be sold or transferred to third parties.
            </p>
            <p>
              <strong>(5) Other:</strong> Regardless of any other provision in this Privacy Policy, we reserve the
              right to disclose any personal data or non-personal data about you if we are required to do so by law,
              with respect to copyright and other intellectual property infringement claims, or if we believe that such
              action is necessary to: (a) fulfill a government request; (b) conform with the requirements of the law or
              legal process; (c) protect or defend our legal rights or property of our Services, or other users; or (d)
              in an emergency to protect the health and safety of our customers or the general public.
            </p>
            <p>
              <strong>(6) Other State Privacy Rights:</strong> Certain U.S. states (each a "State") have enacted
              consumer privacy laws that grant their residents certain additional rights and require additional
              disclosures on the part of businesses that process personal information of such residents. For example,
              under certain provisions of a State, residents of the State have the right to request from companies
              conducting business in that State a list of all third parties to which the Company has disclosed certain
              personally identifiable information as defined under State law during the preceding year for third party
              direct marketing purposes.
            </p>
            <p>Such States may also provide their State residents with certain additional rights such as:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Right to Access.</li>
              <li>Right to Correct.</li>
              <li>Right to Delete.</li>
              <li>Right to Opt-out of Sale.</li>
              <li>Right to Opt-out of Targeted Advertising.</li>
              <li>Right to Opt-out of Profiling.</li>
              <li>Right Against Discrimination.</li>
              <li>Right to Portability.</li>
              <li>Right to Opt-out of Sharing.</li>
              <li>Right to Limit the Use of Sensitive Personal Information.</li>
            </ul>
            <p>To know more about these rights and obtain additional disclosures, please see below.</p>
            <p>
              To exercise any of these rights, please email us at the contact information above. To appeal a decision
              regarding a consumer rights request, please contact us at the information above.
            </p>
            <p>
              <strong>(7) Chat Features.</strong> Our Website or Application may use chats. Chats with Company may be
              saved, stored, and used by Company for customer support, quality assurance, and as described in this
              Privacy Policy. Where Company makes chat features available, we may utilize third-party service providers
              or vendors. Our service providers that support chat features only use personal data in chat
              communications to support and improve the Company chat experience and our services. If you do not agree
              to this, do not use the chat feature.
            </p>
            <p>
              <strong>(8) Sharing or Disclosing Personal Information.</strong> We may share or disclose your personal
              information to our trusted third party business partners to provide you with information or services
              related to events. For example, we sometimes share your personal information with our marketing service
              providers, who help us create targeted advertisements for products and services that may interest you. We
              do not receive monetary consideration for the sharing or disclosing of such personal information. Under
              applicable State law, this type of sharing or disclosure may be considered a "Sale" or "Sharing" of
              Personal Information.
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                Disclosures of Personal Information. Please see the table below for a description of the categories of
                personal information for a business purpose that we may have disclosed to service providers in the
                preceding 12 months.
              </li>
              <li>
                Sale or Sharing of Personal Information. In the preceding twelve (12) months, we have shared or
                disclosed the following categories of personal information as follows: Identifiers, Internet or other
                electronic network activity information, and Inferences derived from personal information to our
                affiliates, services providers, and business partners.
              </li>
            </ol>
            <p>
              We may also share information with third parties for the purpose of cross-context behavioral advertising.
              For opt-out options, please see the <strong>Your Rights and Choices</strong> section below.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">G. Public Forums</h3>
            <p>
              We may offer chat rooms, blogs, message boards, or similar public forums where you and other users of our
              Services can share information and communicate – e.g., places where you can post your resume and/or
              profile. The protections described in this Privacy Policy do not apply when you provide information
              (including personal information) in connection with your use of these public forums. We may use
              personally identifiable and non-personal information about you to identify you with a posting in a public
              forum. Any information you share in a public forum is public information and may be seen or collected by
              anyone, including third parties that do not adhere to our Privacy Policy. We are not responsible for
              events arising from the distribution of any information you choose to publicly post or share through our
              Services.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">H. Children</h3>
            <p>
              The features, programs, promotions, and other aspects of our Services requiring the submission of
              personally identifiable information are not intended for children. We do not market and do not knowingly
              collect personally identifiable information from children under the age of 16. Certain benefits of our
              Services may be restricted to adults, age 18 or older. If you are a parent or guardian of a child under
              the age of 16 and believe he or she has disclosed personally identifiable information to us, please
              contact us as provided in Section I below. A parent or guardian of a child under the age of 16 may review
              and request deletion of such child's personally identifiable information as well as prohibit the use
              thereof. If we discover that we have inadvertently collected information from a child under 16 years of
              age, we will promptly take all reasonable measures to delete such information from our systems.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">I. Keeping Your Information Secure</h3>
            <p>
              We have implemented security measures we consider reasonable and appropriate to protect against the loss,
              misuse, and alteration of the information under our control. Please be advised, however, that while we
              strive to protect your personal data and privacy, we cannot guarantee or warrant the security of any
              information you disclose or transmit to us online or through our Services, and are not responsible for
              the theft, destruction, or inadvertent disclosure of your personal data. In the unfortunate event that
              your personal data (as the term or similar terms are defined by any applicable law requiring notice upon
              a security breach) is compromised, we may notify you, according to applicable law, in the most expedient
              time reasonable under the circumstances; provided, however, delays in notification may occur while we
              take necessary measures to determine the scope of the breach and restore reasonable integrity to the
              system as well as for the legitimate needs of law enforcement if notification would impede a criminal
              investigation. From time to time, we evaluate new technology for protecting information, and, when
              appropriate, we upgrade our information security systems.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">J. Other Sites/Third-Party Links</h3>
            <p>
              Our Services may link to or contain links to third party websites that we do not control or maintain,
              such as in connection with purchasing products we may recommend or reference via our Services and/or
              advertisements you may see while using our Services. We are not responsible for the privacy practices
              employed by any third party website. We encourage you to note when you leave our Website and to read the
              privacy statements of all third party websites before submitting any personally identifiable information.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">K. Contact & Opt-Out Information</h3>
            <p>
              You may contact us at the information provided above if: (a) you have questions or comments about our
              Privacy Policy; (b) wish to make corrections to any personally identifiable information you have
              provided; (c) want to opt-out from receiving future commercial correspondence, including emails, from us
              or our affiliated companies; or (d) wish to withdraw your consent to sharing your personally identifiable
              information with others.
            </p>
            <p>
              We will respond to your request and, if applicable and appropriate, make the requested change in our
              active databases as soon as reasonably practicable. Please note that we may not be able to fulfill
              certain requests while allowing you access to certain benefits and features of our Services.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">L. Sole Statement</h3>
            <p>
              This Privacy Policy, as posted on this Website, is the sole statement of our privacy policy with respect
              to our Services, and no summary, modification, restatement or other version thereof, or other privacy
              statement or policy, in any form, is valid unless we post a new or revised policy to the Website.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">M. Your Rights</h3>
            <p>
              Individuals in certain countries, areas, or jurisdictions may be afforded certain privacy rights based on
              local, applicable privacy laws (the "Data Subjects"). Subject to our discretion and insofar as required
              by applicable law(s), Data Subjects from applicable jurisdictions may have the following rights:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>To access the personal data we maintain about you;</li>
              <li>To be provided with information about how we process your personal data;</li>
              <li>To correct your personal data;</li>
              <li>To have your personal data erased;</li>
              <li>To object to or restrict how we process your personal data; and</li>
              <li>To request your personal data be transferred to a third party.</li>
            </ul>
            <p>
              To exercise the above rights, please contact us at the information provided above. We will consider and
              process your request within a reasonable period of time. Please be aware that under certain
              circumstances, the applicable law may limit your exercise of these rights.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">N. Retention of Personal Data</h3>
            <p>We will retain your personal data in accordance with applicable law.</p>

            <h3 className="text-xl font-heading font-semibold text-foreground">O. How to Withdraw Consent</h3>
            <p>
              At any time, Data Subjects from applicable State jurisdictions may withdraw consent you have provided to
              us for using, disclosing, or otherwise processing your Personal Data. You may withdraw your consent by
              emailing us at the information above and following the instructions in our communication to you. This
              applies only insofar as Company relies on your consent as the basis for processing your personal data.
            </p>
            <p>
              Please note that your withdrawal of consent to process certain personal data about you (1) may limit our
              ability to deliver services to you and (2) does not affect the lawfulness of our processing activities
              based on your consent before its withdrawal.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">P. States Supplemental Privacy Information</h3>
            <p>
              This Supplemental Privacy Notice (the "Notice") supplements the information above. We adopt this Notice
              to comply with those States' privacy laws insofar as they apply to Company, require the disclosures
              herein, and afford you certain privacy-related rights (the "Applicable State law"). Terms defined in the
              Applicable State law shall have the same meaning when used in this Notice unless this Notice explicitly
              alters or provides an alternative definition.
            </p>
            <p>
              States may not have identical or even similar privacy laws. This means that in your State, Applicable
              State law may not afford you certain rights or require that we make additional disclosures to you. To the
              extent your State does not afford you certain privacy-related rights, or require us to make additional
              disclosures to you, or otherwise does not apply, the respective provisions in this Notice shall not apply
              to you. For example, Applicable State law may not apply to personal data (defined below) we collect from
              employees, alternative workforce members, or job applicants.
            </p>

            <h4 className="text-lg font-heading font-semibold text-foreground">Information We Collect</h4>
            <p>
              We collect information that identifies, relates to, describes, references, is reasonably capable of being
              associated with, or could reasonably be linked, directly or indirectly, with a particular individual,
              consumer, or household ("personal information," or sometimes referred to as "personal data" herein).
            </p>
            <p>Personal information does not include:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Publicly available information from government records.</li>
              <li>Deidentified or aggregated consumer information.</li>
              <li>
                Information excluded from the Applicable State Law's scope, like:
                <ul className="list-[circle] pl-6 space-y-1 mt-2">
                  <li>
                    Health or medical information covered by the Health Insurance Portability and Accountability Act
                    of 1996 (HIPAA);
                  </li>
                  <li>
                    Personal information covered by certain sector-specific privacy laws, including the Fair Credit
                    Reporting Act (FCRA), the Gramm-Leach-Bliley Act (GLBA), and the Driver's Privacy Protection Act
                    of 1994.
                  </li>
                </ul>
              </li>
            </ul>
            <p>
              In particular, we have collected the following categories of personal information from our consumers
              within the last twelve (12) months:
            </p>

            <div className="not-prose overflow-x-auto my-6">
              <table className="w-full text-base border-collapse border border-border">
                <thead>
                  <tr className="bg-muted">
                    <th className="border border-border p-3 text-left text-foreground font-semibold">Category</th>
                    <th className="border border-border p-3 text-left text-foreground font-semibold">Example</th>
                    <th className="border border-border p-3 text-left text-foreground font-semibold">Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-border p-3 align-top">Identifiers</td>
                    <td className="border border-border p-3 align-top">
                      A real name, alias, postal address, unique personal identifier, online identifier, email address,
                      account name, government ID numbers, or other similar identifiers.
                    </td>
                    <td className="border border-border p-3 align-top">
                      To fulfill or meet the reason for which the information is provided. To provide you with
                      information, products, or services and/or to improve the information, products, or services
                      provided. To carry out our obligations and enforce our rights arising from any contracts entered
                      into between you and us, including for billing and collections.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 align-top">
                      Personal information categories listed in applicable state statutes.
                    </td>
                    <td className="border border-border p-3 align-top">
                      A name, signature, physical characteristics or description, address, telephone number, passport
                      number, driver's license or state identification card number, insurance policy number, education,
                      employment, employment history, bank account number, credit card number, debit card number, or
                      any other financial information, medical information, or health insurance information. Some
                      personal information included in this category may overlap with other categories.
                    </td>
                    <td className="border border-border p-3 align-top">
                      To fulfill or meet the reason for which the information is provided. To provide you with
                      information, products, or services and/or to improve the information, products, or services
                      provided. To carry out our obligations and enforce our rights arising from any contracts entered
                      into between you and us, including for billing and collections.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 align-top">
                      Protected classification characteristics under state or federal law.
                    </td>
                    <td className="border border-border p-3 align-top">
                      Age (40 years or older), race, color, ancestry, national origin, citizenship, religion or creed,
                      marital status, medical condition, physical or mental disability, sex (including gender, gender
                      identity, gender expression, pregnancy or childbirth, and related medical conditions), sexual
                      orientation, veteran or military status, genetic information (including familial genetic
                      information).
                    </td>
                    <td className="border border-border p-3 align-top">
                      To fulfill or meet the reason for which the information is provided. To provide you with
                      information, products, or services and/or to improve the information, products, or services
                      provided.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 align-top">Commercial information.</td>
                    <td className="border border-border p-3 align-top">
                      Records of personal property, products or services purchased, obtained, or considered, or other
                      purchasing or consuming histories or tendencies.
                    </td>
                    <td className="border border-border p-3 align-top">
                      To fulfill or meet the reason for which the information is provided. To provide you with
                      information, products, or services and/or to improve the information, products, or services
                      provided. To carry out our obligations and enforce our rights arising from any contracts entered
                      into between you and us, including for billing and collections.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 align-top">
                      Internet or other similar network activity.
                    </td>
                    <td className="border border-border p-3 align-top">
                      Browsing history, search history, information on a consumer's interaction with a website,
                      application, or advertisement.
                    </td>
                    <td className="border border-border p-3 align-top">
                      To fulfill or meet the reason for which the information is provided. To provide you with
                      information, products, or services and/or to improve the information, products, or services
                      provided.
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-border p-3 align-top">
                      Inferences drawn from other personal information.
                    </td>
                    <td className="border border-border p-3 align-top">
                      Profile reflecting a person's preferences, characteristics, psychological trends, predispositions,
                      behavior, attitudes, intelligence, abilities, and aptitudes.
                    </td>
                    <td className="border border-border p-3 align-top">
                      To fulfill or meet the reason for which the information is provided. To provide you with
                      information, products, or services and/or to improve the information, products, or services
                      provided. To carry out our obligations and enforce our rights arising from any contracts entered
                      into between you and us, including for billing and collections.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>
              We obtain the above categories of personal information from the following categories of sources as
              disclosed above.
            </p>

            <h4 className="text-lg font-heading font-semibold text-foreground">Use of Personal Information</h4>
            <p>
              We may use or disclose the personal information we collect for one or more of the purposes disclosed
              above.
            </p>
            <p>
              We will not collect additional categories of personal information or use the personal information we
              collected for materially different, unrelated, or incompatible purposes without providing you notice.
            </p>

            <h4 className="text-lg font-heading font-semibold text-foreground">Sharing or Disclosing Personal Information</h4>
            <p>
              We may share or disclose your personal information to our trusted third party business partners to
              provide you with information or services related to events. For example, we sometimes share your personal
              information with our marketing service providers, who help us create targeted advertisements for products
              and services that may interest you. We do not receive monetary consideration for the sharing or
              disclosing of such personal information. Under Applicable State law, this type of sharing or disclosure
              may be considered a "Sale" or "Sharing" of Personal Information.
            </p>

            <h4 className="text-lg font-heading font-semibold text-foreground">Data Retention</h4>
            <p>
              We will retain your personal information in accordance with Applicable State law. The data storage period
              may vary with scenario, product, and service. The standards we use to determine the retention period are
              as follows:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The time required to retain personal data to fulfill business purposes, including providing
                products/services;
              </li>
              <li>Maintaining corresponding transaction/business records;</li>
              <li>Handling possible queries or complaints and locating problems;</li>
              <li>Whether the user agrees to longer retention period; and</li>
              <li>
                Whether the law, contract, or other equivalencies have special requirements for data retention.
              </li>
            </ul>

            <h4 className="text-lg font-heading font-semibold text-foreground">Your Rights and Choices</h4>
            <p>
              The Applicable State law provides State residents with specific rights regarding their personal
              information. This section describes your Applicable State law rights and explains how to exercise those
              rights.
            </p>

            <h5 className="text-base font-heading font-semibold text-foreground">1. Right to Limit Use and Disclosure of Sensitive Personal Information</h5>
            <p>
              The only sensitive personal information we affirmatively collect from you is necessary to perform the
              services or provide the goods or services you requested. We may also periodically receive unsolicited
              information from you that includes sensitive personal information; we make no further use or disclosure
              of that unsolicited sensitive personal information. If you have questions about sensitive personal
              information, please see Exercising Your Rights to contact us.
            </p>

            <h5 className="text-base font-heading font-semibold text-foreground">2. Right to Opt-Out of Personal Information Sharing</h5>
            <p>
              You will be opted in by default to the sharing of personal information as defined under the Applicable
              State law.
            </p>
            <p>
              Please note, we do not track users across devices, so you will have to opt-out from each device where you
              access our website or services. You have the right to opt-out of the sharing of your personal
              information. "Share" may be defined under the Applicable State law to include the transfer of personal
              information to third parties for cross-context behavioral advertising purposes. Like many websites, we
              use commonly used and routine cookies, pixels, and similar technology, and we Share certain information
              to certain third-party advertisers in order to improve your user experience and to optimize our marketing
              activities. You have the right to direct us not to Share or use your personal information for
              cross-context behavioral advertising purposes. Please note that you may still receive generalized ads
              after opting out of targeted advertising.
            </p>
            <p>
              You may also opt-out of the sale or sharing of your personal information by emailing us your name and
              email address to the contact information below.
            </p>

            <h5 className="text-base font-heading font-semibold text-foreground">3. Access to Specific Information and Data Portability Rights</h5>
            <p>
              You have the right to request that we disclose certain information to you about our collection and use of
              your personal information over the past 12 months. Once we receive and confirm your verifiable consumer
              request (see "Exercising Your Rights" section), we will disclose to you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The categories of personal information we collected about you;</li>
              <li>The categories of sources for the personal information we collected about you;</li>
              <li>Our business or commercial purpose for collecting or selling that personal information;</li>
              <li>The categories of third parties with whom we share that personal information;</li>
              <li>
                The specific pieces of personal information we collected about you (also called a data portability
                request);
              </li>
              <li>
                If we sold or disclosed your personal information for a business purpose, two separate lists
                disclosing:
                <ul className="list-[circle] pl-6 space-y-1 mt-2">
                  <li>
                    Sales, identifying the personal information categories that each category of recipient purchased;
                    and
                  </li>
                  <li>
                    Disclosures for a business purpose, identifying the personal information categories that each
                    category of recipient obtained.
                  </li>
                </ul>
              </li>
            </ul>

            <h5 className="text-base font-heading font-semibold text-foreground">4. Right to Correct/Rectify Personal Information</h5>
            <p>
              You have the right to rectify (correct, update, or modify) the personal information we collect about you.
              After making such a request, we will take commercially reasonable efforts to correct inaccurate personal
              information within the timeliness requirements set forth under Applicable State laws. In any case, we
              will work to correct such information within the time period required by applicable law. In the event an
              extension is needed, we may take an additional period of time allowed by law, when reasonably necessary.
              In this case, we will provide you a notice of extension within the time period required by law.
            </p>

            <h5 className="text-base font-heading font-semibold text-foreground">5. Deletion Request Rights</h5>
            <p>
              You have the right to request that we delete any of your personal information that we collected from you
              and retained, subject to certain exceptions. Once we receive and confirm your verifiable consumer request
              (see "Exercising Your Rights" section), we will delete (and direct our service providers to delete) your
              personal information from our records, unless an exception applies.
            </p>
            <p>
              We may deny your deletion request if retaining the information is necessary for us or our service
              provider(s) to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Complete the transaction for which we collected the personal information, provide a good or service
                that you requested, take actions reasonably anticipated within the context of our ongoing business
                relationship with you, fulfill the terms of a written warranty or product recall conducted in
                accordance with federal law, or otherwise perform our contract with you.
              </li>
              <li>
                Detect security incidents, protect against malicious, deceptive, fraudulent, or illegal activity, or
                prosecute those responsible for such activities.
              </li>
              <li>Debug products to identify and repair errors that impair existing intended functionality.</li>
              <li>
                Exercise free speech, ensure the right of another consumer to exercise their free speech rights, or
                exercise another right provided for by law.
              </li>
              <li>Comply with the State laws.</li>
              <li>
                Engage in public or peer-reviewed scientific, historical, or statistical research in the public
                interest that adheres to all other applicable ethics and privacy laws, when the information's deletion
                may likely render impossible or seriously impair the research's achievement, if you previously provided
                informed consent.
              </li>
              <li>
                Enable solely internal uses that are reasonably aligned with consumer expectations based on your
                relationship with us.
              </li>
              <li>Comply with a legal obligation.</li>
              <li>
                Make other internal and lawful uses of that information that are compatible with the context in which
                you provided it.
              </li>
            </ul>

            <h5 className="text-base font-heading font-semibold text-foreground">6. Right to Opt-out of Targeted Advertising</h5>
            <p>
              On occasion, if we engage in any targeted advertising on our Website, You may have the right to opt out
              of processing of your personal data for purposes of targeted advertising based on your activity across
              non-affiliated websites, applications, and online services. Like many websites, we use cookies, pixels,
              and similar technology, and we share certain information, such as your device identifiers, to certain
              third-party advertisers to improve your user experience and to optimize our marketing activities. Please
              note that you may still receive generalized ads after opting out of targeted advertising and we may still
              personalize your experience based on your activity.
            </p>

            <h5 className="text-base font-heading font-semibold text-foreground">7. Right to Opt-out of Profiling</h5>
            <p>
              Certain State users have the right to opt-out of "profiling." This right applies to the automated
              processing of personal data that is utilized to render decisions that have a legal or similarly
              significant effect on the user. Examples of such decisions include those related to credit and access to
              fundamental goods and services. We will disclose to you whenever we engage in such activity.
            </p>

            <h5 className="text-base font-heading font-semibold text-foreground">8. Right to Limit the Use of Sensitive Personal Information</h5>
            <p>
              To the extent your sensitive personal information is used to infer characteristics about you, you have
              the right to direct us to stop such processing of your sensitive personal information for such purposes.
              Company does not use your sensitive personal information to infer characteristics about you.
            </p>

            <h5 className="text-base font-heading font-semibold text-foreground">9. Right Against Discrimination</h5>
            <p>
              You have the right not to be discriminated against for exercising any of the rights described in this
              section. Company will not discriminate against you for exercising or requesting to exercise your privacy
              rights noted above.
            </p>

            <h5 className="text-base font-heading font-semibold text-foreground">10. Exercising Your Rights</h5>
            <p>
              To exercise the rights described above, please submit a verifiable consumer request to us by either
              calling us or emailing us at the information above. Only you, or someone legally authorized to act on
              your behalf, may make a verifiable consumer request related to your personal information. You may also
              make a verifiable consumer request on behalf of your minor child.
            </p>
            <p>
              You may only make a verifiable consumer request for access or data portability twice within a 12-month
              period. The verifiable consumer request must:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Provide sufficient information that allows us to reasonably verify you are the person about whom we
                collected personal information or an authorized representative, which may include:
                <ul className="list-[circle] pl-6 space-y-1 mt-2">
                  <li>your name, email address, and street address (including city, state, and zip code).</li>
                </ul>
              </li>
              <li>
                Describe your request with sufficient detail that allows us to properly understand, evaluate, and
                respond to it.
              </li>
            </ul>
            <p>
              We cannot respond to your request or provide you with personal information if we cannot verify your
              identity or authority to make the request and confirm the personal information relates to you.
            </p>
            <p>
              Making a verifiable consumer request does not require you to create an account with us. However, we do
              consider requests made through your password protected account sufficiently verified when the request
              relates to personal information associated with that specific account.
            </p>
            <p>
              We will only use personal information provided in a verifiable consumer request to verify the requestor's
              identity or authority to make the request.
            </p>

            <h5 className="text-base font-heading font-semibold text-foreground">11. Response Timing and Format</h5>
            <p>
              We endeavor to respond to a verifiable consumer request within the time period required by law. If we
              require more time, we will inform you of the reason and extension period in writing.
            </p>
            <p>
              We will deliver our written response by mail or electronically, or, if you have an account with us, we
              may deliver our written response to that account.
            </p>
            <p>
              Any disclosures we provide will only cover the 12-month period preceding the verifiable consumer
              request's receipt. The response we provide will also explain the reasons we cannot comply with a request,
              if applicable. For data portability requests, we will select a format to provide your personal
              information that is readily useable and should allow you to transmit the information from one entity to
              another entity without hindrance, such as via the email address that you provided or certified mail if
              requested.
            </p>
            <p>
              We do not charge a fee to process or respond to your verifiable consumer request unless it is excessive,
              repetitive, or manifestly unfounded. If we determine that the request warrants a fee, we will tell you
              why we made that decision and provide you with a cost estimate before completing your request.
            </p>

            <h4 className="text-lg font-heading font-semibold text-foreground underline">Non-Discrimination</h4>
            <p>
              We will not discriminate against you for exercising any of your Applicable State law rights. Unless
              permitted by the Applicable State law, we will not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Deny you goods or services.</li>
              <li>
                Charge you different prices or rates for goods or services, including through granting discounts or
                other benefits, or imposing penalties.
              </li>
              <li>Provide you a different level or quality of goods or services.</li>
              <li>
                Suggest that you may receive a different price or rate for goods or services or a different level or
                quality of goods or services.
              </li>
            </ul>
            <p>
              However, we may offer you certain financial incentives permitted by the Applicable State law that can
              result in different prices, rates, or quality levels. Any Applicable State law-permitted financial
              incentive we offer will reasonably relate to your personal information's value and contain written terms
              that describe the program's material aspects. Participation in a financial incentive program requires
              your prior opt in consent, which you may revoke at any time.
            </p>
            <p>We currently do not provide any financial incentives.</p>
          </TabsContent>

          <TabsContent id="terms" value="terms" className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-sm italic text-muted-foreground/70 mb-6">
              Draft — subject to legal review. Last updated: {new Date().toLocaleDateString()}.
            </p>

            <h2 className="text-2xl font-heading font-bold text-foreground mt-0">Terms of Service</h2>
            <p>
              By accessing and using the Indiana Tube Corporation website, you agree to the
              following terms and conditions.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Use of Website</h3>
            <p>
              This website is provided for informational purposes about Indiana Tube Corporation's
              products and services. You agree to use it only for lawful purposes and in
              accordance with these Terms.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Intellectual Property</h3>
            <p>
              All content on this website — including text, images, logos, and graphics — is the
              property of Indiana Tube Corporation and is protected by applicable intellectual
              property laws. You may not reproduce, distribute, or create derivative works without
              our prior written consent.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Disclaimer</h3>
            <p>
              The information on this website is provided "as is" without warranty of any kind.
              Indiana Tube Corporation makes no representations or warranties regarding the
              accuracy or completeness of any content.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Limitation of Liability</h3>
            <p>
              Indiana Tube Corporation shall not be liable for any damages arising from the use
              of, or inability to use, this website or its content.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Changes to Terms</h3>
            <p>
              We reserve the right to update these Terms at any time. Continued use of the website
              after changes constitutes acceptance of the revised Terms.
            </p>

            <h3 className="text-xl font-heading font-semibold text-foreground">Contact</h3>
            <p>
              Questions about these Terms may be directed to{" "}
              <a href="mailto:sales@indianatube.com" className="text-primary hover:underline">
                sales@indianatube.com
              </a>.
            </p>
          </TabsContent>
        </Tabs>
      </SectionReveal>
    </div>
  );
};

export default Legal;
