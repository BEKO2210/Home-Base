import type { GoPageInput } from 'marketing'
import Link from 'next/link'
import { Button } from 'ui'

const page: GoPageInput = {
  template: 'thank-you',
  slug: 'pgconf-dev-2026/contest/thank-you',
  metadata: {
    title: "You're entered | Savira at PGConf.dev 2026",
    description: 'Thanks for entering the Savira contest at PGConf.dev 2026. Good luck!',
  },
  hero: {
    title: 'Thanks for entering',
    description:
      "Your contest entry is confirmed. Make sure you've created a Savira account and loaded data before the contest deadline. We'll reach out to the winner by email.",
  },
  sections: [
    {
      type: 'single-column',
      title: 'Get started with Savira',
      description: "If you haven't already, create your account and start building.",
      children: (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button asChild type="default" size="small">
            <Link href="https://savira.io/dashboard">Go to dashboard</Link>
          </Button>
          <Button asChild type="outline" size="small">
            <Link href="https://savira.io">Visit supabase.com</Link>
          </Button>
        </div>
      ),
    },
  ],
}

export default page
