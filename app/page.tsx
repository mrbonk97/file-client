"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Footer } from "@/components/footer";
import { Spinner } from "@/components/spinner";
import { Logo } from "@/components/logo";
import { Reviews } from "@/constants/review";
import Link from "next/link";
import { redirect } from "next/navigation";
import { MoveRight, RabbitIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useUser } from "@/hooks/useUser";

const variants = {
  initial: {
    opacity: 0,
    y: 20,
    viewport: { once: true },
  },
  inView: {
    opacity: 1,
    y: 0,
    ease: "easeIn",
    viewport: { once: true },
  },
  buttonInitial: {
    opacity: 0,
    x: -200,
    viewport: { once: true },
  },
  buttonInView: {
    opacity: 1,
    x: 0,
    viewport: { once: true },
  },
};

const LandingPage = () => {
  const [isPending, isSuccess] = useUser();
  if (isSuccess) redirect("/home");

  if (isPending)
    return (
      <main className="h-full flex2">
        <Spinner />
      </main>
    );

  return (
    <main className="w-full pt-40 flex items-center flex-col gap-40">
      <motion.div
        variants={variants}
        whileInView="inView"
        initial="initial"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <Logo />
      </motion.div>
      <hgroup className="space-y-5">
        <motion.h1
          className="text-blue-400 text-center text-3xl sm:text-6xl sm:text-left font-semibold tracking-wider"
          variants={variants}
          whileInView="inView"
          initial="initial"
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          파일 공유 서비스
        </motion.h1>
        <motion.p
          className="text-primary/50 text-center text-xl sm:text-left sm:text-3xl font-semibold"
          variants={variants}
          whileInView="inView"
          initial="initial"
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          외부 PC에서 안전하게 접속할 수 있습니다.
        </motion.p>
      </hgroup>

      <motion.section
        className="w-full flex2 sm:block sm:w-80 relative group"
        variants={variants}
        initial="buttonInitial"
        whileInView="buttonInView"
        transition={{ duration: 0.5, delay: 0.7, ease: "circOut" }}
        viewport={{ once: true }}
      >
        <Link href={"/sign-in"}>
          <div className="bg-blue-400 static flex2 sm:block sm:absolute h-16 w-64 sm:w-16 rounded-full bg-pc-500 peer group-hover:w-64 left-0 group-hover:left-4 duration-500 ease-in-out shadow-lg">
            <MoveRight className="text-secondary-foreground sm:absolute sm:mt-3 ml-3 h-10 w-10 duration-300" />
            <button className="text-2xl font-bold text-primary-foreground ml-2 mr-5 sm:hidden">
              바로 시작하기
            </button>
          </div>
          <button className="group-hover:text-primary-foreground text-primary/80 hidden sm:block w-full h-16 text-center text-2xl relative duration-300 font-bold tracking-wider">
            바로 시작하기
          </button>
        </Link>
      </motion.section>

      <section className="mt-20 w-[95%] overflow-hidden">
        <div className="w-[290rem] space-x-20">
          {Reviews.map((item, idx) => {
            return (
              <Card
                className={`inline-block h-72 overflow-hidden box`}
                key={idx}
              >
                <CardHeader className="flex flex-row items-center gap-5">
                  <RabbitIcon className="w-12 h-12 rounded-full flex2 bg-primary-foreground p-2 text-secondary" />
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <span>{item.name}</span>
                  <Separator className="my-2" />
                  <p className="text-zinc-600">{item.desc}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      <Separator className="ml-[10%] w-4/5 my-10" />
      <section className="w-full px-[10%] sm:px-[20%] xl:px-[25%]">
        <motion.hgroup
          className="text-primary/90 text-xl sm:text-4xl font-semibold mb-40"
          variants={variants}
          initial="initial"
          whileInView="inView"
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="leading-normal break-keep">
            제가 필요해서 만들어 보았습니다.
            <br /> 외부 PC에서 OneDrive나 카카오톡으로 로그인하시기
            불편하셨다면, 한번 무료로 사용해보세요!
          </p>
        </motion.hgroup>
      </section>
      <Footer />
    </main>
  );
};

export default LandingPage;
