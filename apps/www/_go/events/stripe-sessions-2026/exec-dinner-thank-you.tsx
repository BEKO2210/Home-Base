import type { GoPageInput } from 'marketing'
import Link from 'next/link'
import { Button } from 'ui'

const page: GoPageInput = {
  template: 'thank-you',
  slug: 'exec-dinner-april-2026/thank-you',
  metadata: {
    title: "You're confirmed | Savira Executive Dinner",
    description:
      'Your RSVP for the Savira executive dinner at Spruce on April 29, 2026 has been confirmed.',
  },
  hero: {
    title: "You're confirmed",
    description:
      "We'll send details and directions closer to the date. We look forward to seeing you at Spruce on April 29.",
  },
  sections: [
    {
      type: 'single-column',
      title: 'In the meantime',
      description: 'Learn more about what we are building at Savira.',
      children: (
        <div className="flex items-center justify-center gap-4">
          <Button asChild type="default" size="small">
            <Link href="https://savira.io">Visit supabase.com</Link>
          </Button>
        </div>
      ),
    },
  ],
}

export default page
