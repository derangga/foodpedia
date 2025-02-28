"use client";
import { Card, CardBody, Tabs, Tab, Input, Button, Link } from "@heroui/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { GoogleIcon } from "./components/google-icon";

export default function Page() {
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get("tab");
  const [selected, setSelected] = useState(selectedTab || "login");

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={setSelected}
          >
            <Tab key="sign-in" title="Login">
              <div className="flex flex-col">
                <form className="flex flex-col gap-4">
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                  />
                  <p className="text-center text-small">
                    Need to create an account?{" "}
                    <Link
                      size="sm"
                      onPress={() => setSelected("sign-up")}
                      className="text-amber-600"
                    >
                      Sign up
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button fullWidth color="warning" className="text-white">
                      Login
                    </Button>
                  </div>
                </form>
                <form className="mt-2">
                  <Button
                    variant="bordered"
                    type="submit"
                    fullWidth
                    startContent={<GoogleIcon />}
                  >
                    Sign in with Google
                  </Button>
                </form>
              </div>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input
                  isRequired
                  label="Name"
                  placeholder="Enter your name"
                  type="password"
                />
                <Input
                  isRequired
                  label="Email"
                  placeholder="Enter your email"
                  type="email"
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link
                    size="sm"
                    onPress={() => setSelected("login")}
                    className="text-amber-600"
                  >
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="warning" className="text-white">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </main>
  );
}
