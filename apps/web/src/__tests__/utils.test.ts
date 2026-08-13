import { describe, expect, it } from "vitest";
import { cn } from "@/lib/utils";

describe("cn", () => {
  it("merges class names and resolves tailwind conflicts", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");

    const isHidden = false;
    expect(cn("text-sm", isHidden && "hidden", "font-bold")).toBe("text-sm font-bold");
  });
});
