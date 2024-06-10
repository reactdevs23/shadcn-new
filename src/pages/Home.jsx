"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Label } from "../components/ui/label";
import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Input } from "../components/ui/input";

const data = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const Home = () => {
  const [open, setOpen] = React.useState(false);
  const [tokenAddress, setTokenAddress] = React.useState("");
  const [decimals, setDecimals] = React.useState();
  const [file, setFile] = React.useState(null);
  const [amount, setAmount] = React.useState();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleKeyDown = (event) => {
    if (
      !(
        /[0-9]/.test(event.key) ||
        event.key === "Backspace" ||
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "."
      )
    ) {
      event.preventDefault();
    }
  };

  return (
    <div className="py-12 max-w-3xl mx-auto flex flex-col gap-3 ">
      <div className="grid gap-3 grid-cols-1fr-auto">
        <div className="flex flex-col gap-2 items-start ">
          <Label>Token</Label>
          <Popover
            open={open}
            onOpenChange={setOpen}
            className="w-full absolute"
          >
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="min-w-[200px] justify-between w-full"
              >
                {tokenAddress
                  ? data.find((framework) => framework.value === tokenAddress)
                      ?.label
                  : "Select or Insert your token/nft TokenAddress"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="min-w-[200px] p-0 w-full">
              <Command>
                <CommandInput placeholder="Search token/nft address..." />
                <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {data.map((framework) => (
                      <CommandItem
                        key={framework.value}
                        value={framework.value}
                        onSelect={(currentValue) => {
                          setTokenAddress(
                            currentValue === tokenAddress ? "" : currentValue
                          );
                          setOpen(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            tokenAddress === framework.value
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {framework.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-2 items-start min-w-10 w-auto">
          <Label>Decimals</Label>
          <Input
            onKeyDown={handleKeyDown}
            id="decimals"
            name="decimals"
            type="number"
            placeholder=""
            value={decimals}
            onChange={(e) => setDecimals(e.target.value)}
            required
            className="w-full"
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 items-start min-w-10 w-auto">
        <Label>Amount</Label>
        <Input
          onKeyDown={handleKeyDown}
          id="amount"
          name="amount"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full"
        />
      </div>
      <div className=" flex flex-col gap-1 ">
        <div className="flex gap-2 justify-between items-center w-full">
          <Label htmlFor="message-2">Address and amount</Label>{" "}
          <div>
            <Input
              id="file"
              type="file"
              onChange={handleFileChange}
              className="hidden"
            />
            <Label htmlFor="file" className="underline">
              Upload file
            </Label>
            {file && (
              <div className="mt-2">
                <p>Selected file: {file.name}</p>
              </div>
            )}
          </div>
        </div>
        <Textarea
          rows={5}
          col={10}
          placeholder="Insert your address and amount separate by comma"
          id="message-2"
        />{" "}
        <div className="flex gap-2 justify-between items-center w-full">
          {" "}
          <p className="text-sm text-muted-foreground">Separeted by commas</p>
          <a
            href="#/"
            target="_blank "
            rel="noreferrer"
            className="text-sm text-muted-foreground underline"
          >
            Show example
          </a>
        </div>
      </div>

      <Button className="font-bold mt-3 " onClick={() => {}}>
        Connect Wallet
      </Button>
    </div>
  );
};
export default Home;
