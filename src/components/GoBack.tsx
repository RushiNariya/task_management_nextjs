import { useRouter } from "next/navigation";
import React from "react";

function GoBack() {

  const router = useRouter();
  return (
    <p
      className="mt-3 text-center w-full text-base cursor-pointer text-gray-500"
      onClick={() => router.back()}
    >
      Go back
    </p>
  );
}

export default GoBack;
