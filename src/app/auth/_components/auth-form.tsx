"use client";
import {
  addToast,
  Card,
  CardBody,
  Tabs,
  Tab,
  Input,
  Button,
  Link,
  Form,
} from "@heroui/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { FormEvent, Key, useActionState, useEffect, useState } from "react";
import { GoogleIcon } from "./google-icon";
import {
  loginAction,
  loginGoogleAction,
  registerAction,
} from "../_actions/authenticate";
import { storeUserData } from "@/utils/user-storage";

export const AuthForm = () => {
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get("tab");
  const router = useRouter();
  const [selected, setSelected] = useState<string>(selectedTab || "login");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginState, formAction, isLoginLoading] = useActionState(
    loginAction,
    null
  );
  const [_, googleFormAction, isGoogleLoading] = useActionState(
    loginGoogleAction,
    null
  );

  const onTabChange = (key: Key) => {
    setSelected(key.toString());
    if (Object.keys(errors).length > 0) {
      setErrors({});
    }
  };

  const onRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEvent = e.currentTarget;
    const form = new FormData(formEvent);
    const password = form.get("password") as string;

    setIsLoading(true);

    const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
    const isValid = regex.test(password);
    if (!isValid) {
      setErrors({
        password:
          "password must 8 character and contains lower, upper, number, and special character",
      });
      setIsLoading(false);
      return;
    }

    const result = await registerAction(form);
    setIsLoading(false);

    if (!result.success) {
      addToast({
        title: "Register failed",
        description: result.message,
        color: "danger",
      });

      return;
    }

    formEvent.reset();

    router.push("/");
  };

  useEffect(() => {
    if (loginState?.success && loginState?.user) {
      storeUserData(loginState.user);
      redirect("/");
    } else if (!loginState?.success && loginState?.message) {
      addToast({
        title: "Login failed",
        description: loginState?.message,
        color: "danger",
      });
    }
  }, [loginState]);

  return (
    <main className="w-screen h-screen flex items-center justify-center">
      <Card className="max-w-full w-[340px] min-h-[400px] max-h-[440px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            size="md"
            onSelectionChange={onTabChange}
          >
            <Tab key="sign-in" title="Login">
              <div className="flex flex-col">
                <Form
                  className="flex flex-col gap-4 items-center"
                  validationErrors={errors}
                  validationBehavior="native"
                  action={formAction}
                >
                  <Input
                    isRequired
                    label="Email"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                  <Input
                    isRequired
                    label="Password"
                    name="password"
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
                  <Button
                    fullWidth
                    color="warning"
                    type="submit"
                    isLoading={isLoginLoading}
                    className="text-white"
                  >
                    Sign in
                  </Button>
                </Form>
                <form className="mt-2" action={googleFormAction}>
                  <Button
                    variant="bordered"
                    type="submit"
                    fullWidth
                    isLoading={isGoogleLoading}
                    startContent={<GoogleIcon />}
                  >
                    Sign in with Google
                  </Button>
                </form>
              </div>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <Form
                className="flex flex-col gap-4 min-h-[300px] max-h-[365px] items-center"
                validationErrors={errors}
                validationBehavior="native"
                onSubmit={onRegisterSubmit}
              >
                <Input
                  isRequired
                  label="Name"
                  name="name"
                  placeholder="Enter your name"
                />
                <Input
                  isRequired
                  label="Email"
                  name="email"
                  placeholder="Enter your email"
                  type="email"
                />
                <Input
                  isRequired
                  label="Password"
                  name="password"
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
                    Sign in
                  </Link>
                </p>
                <Button
                  type="submit"
                  isLoading={isLoading}
                  fullWidth
                  color="warning"
                  className="text-white"
                >
                  Sign up
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </main>
  );
};
