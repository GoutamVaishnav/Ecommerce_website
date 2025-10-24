"use client";
import { UserButton } from "@clerk/nextjs";
import { ShoppingBag } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const ProfileButton = () => {
  const router = useRouter();
  return (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="See orders"
          labelIcon={<ShoppingBag className="p-1" />}
          onClick={() => {
            router.push("/orders");
          }}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default ProfileButton;
