
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    quote: "IoT-Sphere has completely transformed how we manage our manufacturing equipment. Real-time monitoring and predictive maintenance have reduced our downtime by 37%.",
    author: "Sarah Johnson",
    role: "CTO at MaxTech Manufacturing",
    initial: "SJ",
  },
  {
    quote: "Setting up our smart agriculture solution was incredibly easy with IoT-Sphere. The platform's flexibility allows us to adapt quickly to changing farm conditions.",
    author: "Michael Chen",
    role: "Director at GreenField Farms",
    initial: "MC",
  },
  {
    quote: "The analytics capabilities have given us unprecedented insights into our retail operations. We've optimized our inventory and improved customer satisfaction.",
    author: "Alex Rivera",
    role: "VP of Technology at RetailPlus",
    initial: "AR",
  },
];

const partners = [
  { name: "TechCorp", logo: "TC" },
  { name: "InnovateSystems", logo: "IS" },
  { name: "NextGen Solutions", logo: "NS" },
  { name: "Global Dynamics", logo: "GD" },
  { name: "FutureTech", logo: "FT" },
];

const Testimonials = () => {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Businesses Worldwide
          </h2>
          <p className="text-lg text-gray-600">
            See what our customers have to say about their experience with IoT-Sphere.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-gray-50 border-none">
              <CardContent className="pt-8">
                <div className="mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 inline-block text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                
                <p className="mb-6 text-gray-700 italic">"{testimonial.quote}"</p>
                
                <div className="flex items-center">
                  <Avatar className="h-10 w-10 mr-4">
                    <AvatarFallback className="bg-iot-primary text-white">
                      {testimonial.initial}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mb-12">
          <p className="text-xl font-medium mb-8">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {partners.map((partner, index) => (
              <div key={index} className="flex items-center justify-center h-16 w-32">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">
                  {partner.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
