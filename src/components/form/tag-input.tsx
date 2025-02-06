import * as Popover from "@radix-ui/react-popover";
import { X, Check } from "lucide-react";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";

interface TagInputProps {
  name: string;
  suggestions?: string[];
  className?: string;
  placeholder?: string;
}

const TagInput = ({
  name,
  suggestions = [],
  className = "",
  placeholder = "Type and press enter to add tags",
}: TagInputProps) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const value = watch(name) || [];
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const error = errors[name];
  const [open, setOpen] = useState(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      if (!value.includes(input.trim())) {
        setValue(name, [...value, input.trim()], { shouldValidate: true });
        setInput("");
        setOpen(true);
      }
    } else if (e.key === "Backspace" && !input && value.length > 0) {
      setValue(name, value.slice(0, -1), { shouldValidate: true });
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue(
      name,
      value.filter((tag: string) => tag !== tagToRemove),
      { shouldValidate: true }
    );
  };

  const addTag = (tag: string) => {
    if (!value.includes(tag)) {
      setValue(name, [...value, tag], { shouldValidate: true });
    }
    setInput("");
    inputRef.current?.focus();
    setOpen(true);
  };

  const filteredSuggestions = suggestions.filter(
    (suggestion) =>
      suggestion.toLowerCase().includes(input.toLowerCase()) &&
      !value.includes(suggestion)
  );

  useEffect(() => {
    if (!value) {
      setValue(name, []);
    }
  }, [name, setValue, value]);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div
          className={`flex flex-wrap gap-2 rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring ${
            error ? "border-destructive focus-within:ring-destructive" : ""
          } ${className}`}
          onClick={() => inputRef.current?.focus()}
        >
          {value.map((tag: string) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-sm bg-accent px-2 py-0.5 text-xs font-medium"
            >
              {tag}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(tag);
                }}
                className="ml-1 rounded-full p-0.5 hover:bg-accent/50"
              >
                <X size={12} className="h-3 w-3 text-muted-foreground" />
              </button>
            </span>
          ))}
          <Input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            className="flex-grow bg-transparent p-0 text-sm placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0 border-none shadow-none"
            placeholder={value.length === 0 ? placeholder : ""}
          />
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <>
          <Popover.Content
            className="z-50 w-[var(--radix-popover-trigger-width)] rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            align="start"
            sideOffset={4}
          >
            <>
              {filteredSuggestions.map((suggestion) => (
                <div
                  key={suggestion}
                  className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                  onClick={(e) => {
                    e.stopPropagation();
                    addTag(suggestion);
                  }}
                >
                  {suggestion}
                  <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
                    <Check className="h-4 w-4 opacity-0 group-hover:opacity-100" />
                  </span>
                </div>
              ))}
            </>
          </Popover.Content>
        </>
      </Popover.Portal>
    </Popover.Root>
  );
};

export default TagInput;
