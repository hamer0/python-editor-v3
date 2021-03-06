import {
  Button,
  HTMLChakraProps,
  IconButton,
  ThemingProps,
} from "@chakra-ui/react";
import React, { ForwardedRef } from "react";

export interface CollapsibleButtonProps
  extends HTMLChakraProps<"button">,
    ThemingProps<"Button"> {
  mode: "icon" | "button";
  text: string;
  icon: React.ReactElement;
  /**
   * Width used only in button mode.
   */
  buttonWidth?: number | string;
}

/**
 * Button that can be a regular or icon button.
 *
 * We'd like to do this at a lower-level so we can animate a transition.
 */
const CollapsableButton = React.forwardRef(
  (
    { mode, text, icon, buttonWidth, ...props }: CollapsibleButtonProps,
    ref: ForwardedRef<HTMLButtonElement>
  ) => {
    return mode === "icon" ? (
      <IconButton ref={ref} icon={icon} aria-label={text} {...props} />
    ) : (
      <Button ref={ref} leftIcon={icon} minWidth={buttonWidth} {...props}>
        {text}
      </Button>
    );
  }
);

export default CollapsableButton;
