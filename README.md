<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1T2fVT_OVdW6Wju7kJfa6UH9FS6Nr_XFz

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Initial Prompt that created this app
Design a web page for closure.info that offers these services: Estate paperwork bot that handles the 47 forms grieving families ask funeral directors to explain

When someone dies, families face a mountain of paperwork during their deepest grief. Death certificates, insurance claims, account closures, estate transfers—these critical tasks pile up exactly when people are least equipped to handle them. FuneralFlow transforms this experience by automating the entire post-funeral administrative process.

Your platform connects funeral homes with a digital system that turns a single death certificate upload into automatic form completion across government agencies, banks, and insurance companies. Families receive real-time updates on what's been processed and what still needs attention.

This will be similar to the workflow of a tax return processing site like TurboTax, but help people make closure of the affairs of a deceased loved one.

**Visual direction - "Calm Capable"**

**Color palette:**

- **Primary**: Deep teal or muted sage green (trustworthy, calm, not funeral-black)
- **Accent**: Warm amber or soft coral (just enough warmth without being cheerful)
- **Neutrals**: Warm grays, not cold blue-grays
- **Background**: Off-white, maybe slight cream tone

Think: **Patagonia website meets banking app** - professional capability with human warmth.

**Typography:**

- **Headings**: Inter or similar (what you're already using on Media Conceptz)
- **Body**: Keep it readable, generous line-height
- **Avoid**: Script fonts (too sentimental), ultra-thin weights (too cold)

**Voice/Tone examples:**

❌ **Too stoic**: "Complete the required documentation to notify financial institutions."

❌ **Too cheerful**: "Let's get these accounts closed! You've got this! 🎉"

✅ **Right tone**: "We'll help you notify banks and close accounts. Most families finish this section in about an hour."

**Key voice principles:**

- **Direct without being cold**: "You'll need 3 certified death certificates" not "Death certificates may be required"
- **Acknowledge reality without dwelling**: "This takes time, and that's okay"
- **Normalize the confusion**: "Most people haven't done this before"
- **Give timeframes**: "This usually takes 2-3 weeks" (reduces anxiety)
- **Permission to pace**: "Save and come back anytime"

**Page flow structure:**

**1. Marketing splash (closure.info/ia)**

code Code

downloadcontent_copy

expand_less

    `Hero section:
"Settling an estate in Iowa doesn't have to be overwhelming"

Subhead: "Step-by-step guidance through every form, 
notification, and account closure after losing someone."

[Get Started] [How It Works]

Then: Simple 3-column benefits
- "Know what needs to be done" (checklist icon)
- "Save time with pre-filled forms" (document icon)  
- "Track your progress" (checkmark icon)`

Keep it minimal like your Media Conceptz site - no stock photos of sad people, no over-designed graphics. Maybe a simple illustration of a checklist with some items checked off.

**2. Account creation**

code Code

downloadcontent_copy

expand_less

    `"First, let's create your private account"

Why we need this:
- Save your progress and come back anytime
- Keep sensitive documents secure
- Track what's complete and what's next

[Email]
[Password]
[Create Account]

"Your information is encrypted and never shared."`

**3. Getting Started wizard**

code Code

downloadcontent_copy

expand_less

    `Progress bar at top: ○ Getting Started → ○ Documents → ○ Notifications → ○ Accounts

"Let's start with a few questions about [deceased's name]"

One question per screen:
- What was their full legal name?
- What was their date of birth?
- What county did they live in?
- Did they have a will?
- Approximate value of their estate?

[Continue] button at bottom

Side note: "We use this to show you only what applies. 
For example, estates under $50,000 can use Iowa's 
simplified process."`

**4. Dashboard (main view after setup)**

code Code

downloadcontent_copy

expand_less

    `Top: Progress indicator
"You've completed 4 of 23 tasks"
[Progress bar: 17%]

Main sections (like TurboTax):
┌─────────────────────────┐
│ ✓ Getting Started       │ Done
├─────────────────────────┤
│ ▶ Government Notices    │ 2 of 5 complete
│   ✓ Social Security     │
│   ✓ Medicare            │
│   • Veterans Affairs    │ ← You are here
│   • Iowa DMV            │
│   • Voter Registration  │
├─────────────────────────┤
│   Financial Accounts    │ Not started
│   Property & Assets     │ Not started
│   Utilities & Services  │ Not started
└─────────────────────────┘

[Continue Where I Left Off] button`

**5. Task detail pages**

code Code

downloadcontent_copy

expand_less

    `Breadcrumb: Dashboard > Government Notices > Social Security

"Notify Social Security"

What you'll need:
• Death certificate
• Deceased's Social Security number
• Your relationship to them

What happens:
When someone passes away, Social Security needs to be 
notified to stop payments and determine if survivors 
are eligible for benefits.

How to do it:
[Call] 1-800-772-1213 (8am-7pm weekdays)
[Visit] Local Social Security office

After you've notified them:
[✓ Mark as Complete]

[Back to Government Notices]`

**6. Document generation pages**

code Code

downloadcontent_copy

expand_less

    `"Bank Account Closure - Wells Fargo"

We'll create a letter for you to send.

What was the account number?
[________]

What type of account?
○ Checking
○ Savings  
○ Both

[Generate Letter]

Result:
[Preview of letter with their info filled in]
[Download PDF] [Email to Me] [Print]

Tips for sending:
Include a certified copy of the death certificate.
Send via certified mail for tracking.
Most banks respond within 2-3 weeks.

[✓ Mark as Sent] [✓ Mark as Complete]`

**Visual elements:**

- **Icons**: Simple line icons, not overly designed
- **Illustrations**: Minimal, abstract (think Dropbox/Slack style)
- **Photography**: Avoid entirely in the app itself
- **White space**: Generous - don't crowd
- **Cards/sections**: Soft shadows, rounded corners (8-12px radius)
- **Progress indicators**: Clear, always visible

**Micro-interactions that help:**

- ✓ Checkmark animation when tasks complete
- Gentle color change on "mark complete"
- Progress bar fills smoothly
- "Saved" indicator after form inputs
- Encouraging but not patronizing messages: "Nice work, that's one less thing to worry about"

**Things to absolutely avoid:**

- Ticking clocks/countdowns (creates pressure)
- Gamification (points, badges, etc.)
- Excessive congratulatory language
- Dark patterns (hiding the logout, etc.)
- Too many choices on one screen

Would you want to see a mockup of the dashboard layout, or dive into the marketing splash page design first? I can sketch out the HTML/CSS structure based on your Media Conceptz style.