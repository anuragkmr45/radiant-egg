# RECPL Admin Panel Manual

**Internal use only.** This manual is for RECPL website administrators who need to update website content and review contact enquiries.

## Website Pages

| Page | Title | URL |
|---|---|---|
| Home | Radiant Engineering Consultancy Pvt. Ltd. | [https://radiantconsultant.com/](https://radiantconsultant.com/) |
| About | About RECPL | [https://radiantconsultant.com/about](https://radiantconsultant.com/about) |
| Gallery | RECPL Gallery | [https://radiantconsultant.com/gallery](https://radiantconsultant.com/gallery) |
| Contact | Contact RECPL | [https://radiantconsultant.com/contact](https://radiantconsultant.com/contact) |
| Consultancy | Structure Design, Drawing & Structural Stability Audit | [https://radiantconsultant.com/services/consultancy](https://radiantconsultant.com/services/consultancy) |
| NDT Services | NDT Testing Services | [https://radiantconsultant.com/services/ndt](https://radiantconsultant.com/services/ndt) |
| Material Testing | Material Testing Services | [https://radiantconsultant.com/services/material-testing](https://radiantconsultant.com/services/material-testing) |
| Supply | Material Testing Equipment & Instrument Supply | [https://radiantconsultant.com/supply](https://radiantconsultant.com/supply) |
| TPI Services | Third Party Inspection Services | [https://radiantconsultant.com/services/tpi](https://radiantconsultant.com/services/tpi) |

**Note:** The TPI Services page currently redirects visitors to the Material Testing page.

## Admin Access

| Item | Value |
|---|---|
| Admin Panel URL | [https://radiantconsultant.com/admin](https://radiantconsultant.com/admin) |
| Email ID | `admin@radiantconsultant.com` |
| Password | `REAdmin@2025` |

Keep these login details private. Do not share them outside the authorized RECPL admin team.

## What The Admin Panel Does

- Lets admins update website content from a protected panel.
- Lets admins edit text, links, images, SEO fields, page sections, buttons, and labels.
- Keeps the website design, layout, alignment, typography, and formatting fixed.
- Stores contact form enquiries in the connected database.
- Lets admins review submitted enquiries from the admin panel.

## 1. Login To The Admin Panel

Open [https://radiantconsultant.com/admin](https://radiantconsultant.com/admin). If you are not logged in, the website will show the sign-in screen.

![Admin login screen](./admin-manual-assets/01-login.png)

Pointers:

- Enter the admin email ID in the **Email** field.
- Enter the admin password in the **Password** field.
- Click **Login** to open the admin dashboard.
- If login fails, check that the email and password are typed exactly.

## 2. Understand The Admin Dashboard

After login, the dashboard shows the main admin areas.

![Admin dashboard](./admin-manual-assets/02-dashboard.png)

Pointers:

- **Contact Submissions** opens the enquiry list received from the contact form.
- **Content Editor** opens the website content editing area.
- **Contact Form** shows whether the database is connected and how many service options are configured.
- Use **Logout** after finishing admin work.

## 3. Open The Content Editor

Click **Open content editor** from the dashboard, or open [https://radiantconsultant.com/admin/content](https://radiantconsultant.com/admin/content).

![Content editor overview](./admin-manual-assets/03-content-editor-overview.png)

Pointers:

- The left side lists the editable website areas.
- Select a page such as **Home Page**, **About Page**, **Contact Page**, **Gallery**, or **Site Settings**.
- The right side shows editable sections and fields for the selected page.
- **Using fallback JSON** means the page is still using the original website content until an admin saves changes.

## 4. Update Website Content

Each page is split into clear sections such as SEO Settings, Hero Section, Services, Industries, Clients, CTA, and similar page-specific groups.

![Content editor fields](./admin-manual-assets/04-content-editor-fields.png)

Pointers:

- Update normal text in single-line fields.
- Update longer paragraphs in larger text boxes.
- Update image links in **Image URL** fields.
- Use dropdowns for controlled choices such as icons or enabled/disabled settings.
- Do not change public page routes unless the website link itself is intentionally changing.

## 5. Save And Verify Changes

After editing, click **Save content**. The admin panel will show a saved confirmation message.

![Saved content confirmation](./admin-manual-assets/05-save-confirmation.png)

Pointers:

- Wait for the saved message before leaving the page.
- Click **View public page** to check the updated page.
- Review the public page for spelling, image quality, and link correctness.
- If something looks wrong, return to the same admin page, fix the field, and save again.

## 6. Review Contact Form Submissions

Open [https://radiantconsultant.com/admin/submissions](https://radiantconsultant.com/admin/submissions), or click **Open submissions** from the dashboard.

![Contact submissions screen](./admin-manual-assets/06-submissions.png)

Pointers:

- Each enquiry card shows the visitor name, selected service, email, phone, company, source page, and message.
- Use the email and phone details to follow up with the visitor.
- New submissions appear after visitors send the public contact form.
- If no enquiries are available, the page will show an empty-state message.

## 7. Logout

Click **Logout** from the top-right area of the admin panel.

Pointers:

- Logout after every admin session.
- Do not leave the admin panel open on a shared computer.
- Log in again only when you need to update content or review enquiries.

## Quick Admin Checklist

- Open the correct website page from the table at the top.
- Login to the admin panel.
- Choose **Content Editor** for website updates.
- Choose **Contact Submissions** for enquiries.
- Save content changes and verify the public page.
- Logout after finishing.
