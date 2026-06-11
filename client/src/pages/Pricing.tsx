import { Check, X } from 'lucide-react';

/**
 * Design System: Vibrant Data Storytelling
 * - Platform colors for visual encoding
 * - Clear pricing tiers with feature comparison
 * - Interactive comparison table
 */

interface PricingTier {
  name: string;
  platform: string;
  price: string;
  period: string;
  description: string;
  color: string;
  highlighted: boolean;
  features: {
    name: string;
    included: boolean;
  }[];
  cta: string;
  ctaLink: string;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Hobby',
    platform: 'Vercel',
    price: 'Free',
    period: 'Forever',
    description: 'Perfect for personal projects and learning',
    color: '#FF6B35',
    highlighted: false,
    features: [
      { name: 'Up to 12 deployments/day', included: true },
      { name: 'Unlimited bandwidth', included: true },
      { name: 'Serverless functions', included: false },
      { name: 'Edge middleware', included: false },
      { name: 'Priority support', included: false },
      { name: 'Custom domains', included: true },
      { name: 'SSL/TLS certificates', included: true },
      { name: 'Analytics', included: false },
    ],
    cta: 'Get Started',
    ctaLink: 'https://vercel.com',
  },
  {
    name: 'Pro',
    platform: 'Vercel',
    price: '$20',
    period: '/month',
    description: 'For professional developers and small teams',
    color: '#FF6B35',
    highlighted: true,
    features: [
      { name: 'Unlimited deployments', included: true },
      { name: 'Unlimited bandwidth', included: true },
      { name: 'Serverless functions', included: true },
      { name: 'Edge middleware', included: true },
      { name: 'Priority support', included: true },
      { name: 'Custom domains', included: true },
      { name: 'SSL/TLS certificates', included: true },
      { name: 'Analytics', included: true },
    ],
    cta: 'Start Free Trial',
    ctaLink: 'https://vercel.com',
  },
  {
    name: 'Starter',
    platform: 'Render',
    price: 'Free',
    period: 'Forever',
    description: 'Great for getting started with web services',
    color: '#10B981',
    highlighted: false,
    features: [
      { name: 'Shared CPU', included: true },
      { name: '0.5 GB RAM', included: true },
      { name: 'Auto-sleep after 15 min inactivity', included: true },
      { name: 'PostgreSQL database', included: false },
      { name: 'Managed databases', included: false },
      { name: 'Custom domains', included: true },
      { name: 'SSL/TLS certificates', included: true },
      { name: 'Email support', included: false },
    ],
    cta: 'Get Started',
    ctaLink: 'https://render.com',
  },
  {
    name: 'Standard',
    platform: 'Render',
    price: '$12',
    period: '/month',
    description: 'For production applications',
    color: '#10B981',
    highlighted: false,
    features: [
      { name: 'Dedicated CPU', included: true },
      { name: '2 GB RAM', included: true },
      { name: 'Always on', included: true },
      { name: 'PostgreSQL database', included: true },
      { name: 'Managed databases', included: true },
      { name: 'Custom domains', included: true },
      { name: 'SSL/TLS certificates', included: true },
      { name: 'Priority support', included: true },
    ],
    cta: 'Start Free Trial',
    ctaLink: 'https://render.com',
  },
  {
    name: 'Starter',
    platform: 'Manus',
    price: 'Free',
    period: 'Forever',
    description: 'Perfect for prototyping and learning',
    color: '#7C3AED',
    highlighted: false,
    features: [
      { name: 'Web static projects', included: true },
      { name: '100 MB storage', included: true },
      { name: 'Basic analytics', included: true },
      { name: 'Database integration', included: false },
      { name: 'API endpoints', included: false },
      { name: 'Custom domain', included: false },
      { name: 'SSL/TLS certificates', included: true },
      { name: 'Community support', included: true },
    ],
    cta: 'Get Started',
    ctaLink: 'https://manus.im',
  },
  {
    name: 'Professional',
    platform: 'Manus',
    price: '$29',
    period: '/month',
    description: 'For production applications with full features',
    color: '#7C3AED',
    highlighted: true,
    features: [
      { name: 'Full-stack projects', included: true },
      { name: '10 GB storage', included: true },
      { name: 'Advanced analytics', included: true },
      { name: 'Database integration', included: true },
      { name: 'API endpoints', included: true },
      { name: 'Custom domain', included: true },
      { name: 'SSL/TLS certificates', included: true },
      { name: 'Priority support', included: true },
    ],
    cta: 'Start Free Trial',
    ctaLink: 'https://manus.im',
  },
];

const comparisonFeatures = [
  'Deployments',
  'Bandwidth',
  'Serverless Functions',
  'Database Support',
  'Custom Domains',
  'SSL/TLS',
  'Analytics',
  'Support Level',
];

export default function Pricing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <section className="bg-gradient-to-r from-[#7C3AED]/10 to-[#FF6B35]/10 py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-2">SaaS Pricing Comparison</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare pricing and features across popular deployment platforms to find the best fit for your projects
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {pricingTiers.map((tier) => (
              <div
                key={`${tier.platform}-${tier.name}`}
                className={`card-dashboard p-8 relative transition-all duration-300 ${
                  tier.highlighted ? 'ring-2 ring-accent transform scale-105' : ''
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="bg-accent text-accent-foreground px-4 py-1 rounded-full text-xs font-bold">
                      RECOMMENDED
                    </span>
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold mb-3"
                    style={{ backgroundColor: tier.color }}
                  >
                    {tier.platform.charAt(0)}
                  </div>
                  <h3 className="text-xl font-bold mb-1">{tier.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{tier.platform}</p>
                  <p className="text-sm text-muted-foreground">{tier.description}</p>
                </div>

                {/* Pricing */}
                <div className="mb-6 pb-6 border-b border-border">
                  <div className="flex items-baseline gap-1 mb-2">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    <span className="text-muted-foreground">{tier.period}</span>
                  </div>
                </div>

                {/* CTA Button */}
                <a
                  href={tier.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full py-2 px-4 rounded-lg font-semibold text-center transition-all mb-6 block ${
                    tier.highlighted
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {tier.cta}
                </a>

                {/* Features */}
                <div className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Comparison Table */}
      <section className="py-12 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Detailed Feature Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold">Feature</th>
                  {pricingTiers.map((tier) => (
                    <th
                      key={`${tier.platform}-${tier.name}`}
                      className="text-center py-4 px-4 font-semibold"
                    >
                      <div className="font-bold">{tier.name}</div>
                      <div className="text-xs text-muted-foreground">{tier.platform}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, idx) => (
                  <tr key={idx} className="border-b border-border hover:bg-secondary/50 transition-colors">
                    <td className="py-4 px-4 font-medium">{feature}</td>
                    {pricingTiers.map((tier) => {
                      const tierFeature = tier.features.find((f) => f.name.includes(feature));
                      return (
                        <td key={`${tier.platform}-${tier.name}-${feature}`} className="text-center py-4 px-4">
                          {tierFeature?.included ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="card-dashboard p-6">
              <h3 className="font-bold mb-2">Can I switch platforms later?</h3>
              <p className="text-muted-foreground">
                Yes! Most platforms offer migration tools and support. You can export your data and redeploy on another
                platform.
              </p>
            </div>

            <div className="card-dashboard p-6">
              <h3 className="font-bold mb-2">Do you offer discounts for annual billing?</h3>
              <p className="text-muted-foreground">
                Most platforms offer 20-30% discounts for annual billing. Check their pricing pages for current offers.
              </p>
            </div>

            <div className="card-dashboard p-6">
              <h3 className="font-bold mb-2">What about enterprise plans?</h3>
              <p className="text-muted-foreground">
                All major platforms offer custom enterprise plans with dedicated support. Contact their sales teams for
                quotes.
              </p>
            </div>

            <div className="card-dashboard p-6">
              <h3 className="font-bold mb-2">Are there any hidden fees?</h3>
              <p className="text-muted-foreground">
                Most platforms are transparent about pricing. Watch out for bandwidth overage charges and database
                storage limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#7C3AED]/10 to-[#FF6B35]/10 py-12 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Deploy?</h2>
          <p className="text-muted-foreground mb-6">
            Choose the platform that best fits your project needs and get started today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg bg-[#FF6B35] text-white hover:bg-[#FF6B35]/90 transition-all font-semibold"
            >
              Deploy on Vercel
            </a>
            <a
              href="https://render.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg bg-[#10B981] text-white hover:bg-[#10B981]/90 transition-all font-semibold"
            >
              Deploy on Render
            </a>
            <a
              href="https://manus.im"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-lg bg-[#7C3AED] text-white hover:bg-[#7C3AED]/90 transition-all font-semibold"
            >
              Deploy on Manus
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
