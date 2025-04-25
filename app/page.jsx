import HeroSection from "@/components/Hero";
import {
  featuresData,
  howItWorksData,
  statsData,
  testimonialsData,
} from "@/data/landing";
import Image from "next/image";
import {
  Card,
  CardContent,

} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="">


      <HeroSection />
  
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl text-center mb-12 font-bold">
          Everything You Need For a Healthier Mind
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuresData.map((feature, index) => {
              return (
                <Card key={index} className={"p-6"}>
                  <CardContent className={"space-y-4 pt-4"}>
                    {feature.icon}
                    <p className="text-xl font-semibold">{feature.title}</p>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl text-center mb-12 font-bold">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {howItWorksData.map((step, index) => {
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl font-bold">
                    {step.icon}
                  </div>
                  <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl text-center mb-12 font-bold">
            What Our User Says
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonialsData.map((testinomial, index) => {
              return (
                <Card key={index} className={"p-6"}>
                  <CardContent className={"space-y-4 pt-4"}>
                    <div className="flex items-center mb-4">
                      <Image
                        src={testinomial.image}
                        alt={testinomial.name}
                        height={40}
                        width={40}
                        className="rounded-full"
                      />
                      <div className="ml-4">
                        <div className="font-semibold">{testinomial.name}</div>
                        <div className="text-sm text-gray-600">
                          {testinomial.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600">{testinomial.quote}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-20 bg-blue-600">
  <div className="container mx-auto px-4 text-center">
    <h3 className="text-3xl text-white mb-4 font-bold">
      Ready To Take Care of Your Mind with MannMitra?
    </h3>
    <p className="text-blue-50 max-w-2xl mx-auto mb-8">
      Start your journey toward a calmer, more mindful you. Join 1000+ others
      who’ve found comfort, clarity, and support with MannMitra. 💬🧘‍♀️💖
    </p>
    <Link href={"/chat-bot"}>
      <Button
        className={"bg-white text-blue-600 hover:text-blue-50 animate-bounce"}
      >
        Talk to Your AI Therapist
      </Button>
    </Link>
  </div>
</section>

    </div>
  );
}
