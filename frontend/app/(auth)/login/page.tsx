"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Link from "next/link";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/service/auth";

function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      let response = await login(formData);
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("token", token);
      router.push("/dashboard");
    } catch (error) {
      console.log("error", error);
      if (error instanceof Error) {
        setErrors({ general: error.message });
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className="flex min-h-screen bg-zinc-50">
        <Card className="w-full max-w-sm m-auto">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form id="loginForm" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="jhondoe@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    name="password"
                    placeholder="******"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    required
                  />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" form="loginForm" className="w-full">
              {loading ? "Processing..." : "Login"}
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/register">Go to Register</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
      <Modal
        dataError={errors}
        open={Object.keys(errors).length === 0 ? false : true}
      />
    </>
  );
}

export default LoginPage;
