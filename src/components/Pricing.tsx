
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const plans = [
  {
    name: "Starter",
    price: "$29",
    description: "Perfect for small IoT projects and individual developers",
    features: [
      "Connect up to 20 devices",
      "5 user accounts",
      "Basic analytics",
      "Standard alerts and notifications",
      "Community support",
      "7-day data retention",
    ],
    popular: false,
    buttonText: "Start Free Trial",
    buttonVariant: "outline",
  },
  {
    name: "Professional",
    price: "$99",
    description: "For growing businesses with expanding IoT needs",
    features: [
      "Connect up to 100 devices",
      "20 user accounts",
      "Advanced analytics and reporting",
      "Custom alerts and webhooks",
      "Priority email support",
      "30-day data retention",
      "Custom dashboards",
    ],
    popular: true,
    buttonText: "Start Free Trial",
    buttonVariant: "default",
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For organizations with advanced requirements",
    features: [
      "Unlimited devices",
      "Unlimited users",
      "Advanced analytics with ML capabilities",
      "Custom integrations",
      "Dedicated support manager",
      "1-year data retention",
      "SLA guarantees",
      "On-premises deployment option",
    ],
    popular: false,
    buttonText: "Contact Sales",
    buttonVariant: "outline",
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="section bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-gray-600">
            Choose the right plan that fits your IoT project needs.
            All plans include a 14-day free trial.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative border ${plan.popular ? 'border-iot-primary shadow-lg' : 'border-gray-200'}`}>
              {plan.popular && (
                <Badge variant="default" className="absolute top-0 right-0 translate-x-2 -translate-y-2 bg-iot-primary">
                  Most Popular
                </Badge>
              )}
              
              <CardHeader className="pb-8 text-center">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-3">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-500">/month</span>}
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="border-t border-b border-gray-100 py-6">
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex">
                      <Check className="h-5 w-5 text-iot-primary shrink-0 mr-3" />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter className="pt-6">
                <Button
                  variant={plan.buttonVariant as any}
                  className={`w-full ${plan.popular ? 'bg-iot-primary hover:bg-iot-primary/90' : ''}`}
                >
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            Need a custom solution? <a href="#" className="text-iot-primary hover:underline">Contact our sales team</a> for a tailored quote.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
