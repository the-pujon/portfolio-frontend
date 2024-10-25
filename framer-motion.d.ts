import { ForwardRefExoticComponent, RefAttributes } from "react";
import { MotionProps as FramerMotionProps } from "framer-motion";

declare module "framer-motion" {
  export interface MotionProps extends FramerMotionProps {
    className?: string;
  }

  export interface HTMLMotionProps<T extends keyof HTMLElementTagNameMap>
    extends MotionProps,
      RefAttributes<HTMLElementTagNameMap[T]> {}

  export type Motion = {
    [K in keyof HTMLElementTagNameMap]: ForwardRefExoticComponent<
      HTMLMotionProps<K>
    >;
  };

  export const motion: Motion;
}
