import buildClassName from "@/shared/lib/buildClassName";
import ActionButton from "@/shared/ui/ActionButton";
import DropdownMenu, {
  DropdopwnSharedProps,
  TriggerProps,
} from "@/shared/ui/dropdown";
import IconButton, { IconButtonSharedProps } from "@/shared/ui/IconButton";
import { FC, memo, useCallback } from "react";
import s from "./FloatingActionButton.module.scss";
import buildStyle from "@/shared/lib/buildStyle";
import MenuSeparator from "@/shared/ui/MenuSeparator";

type IFloatingAction =
  | {
      icon: React.ReactNode;
      label: string;
      onClick: NoneToVoidFunction;
    }
  | "-"
  | "="
  | "==";

interface FloatinActionButtonProps {
  icon: React.ReactNode;
  actions?: IFloatingAction[];
  className?: string;
  hideOnScroll?: boolean;
  transformOrigin?: number;
  transformOriginX?: number;
  transformOriginY?: number;
  isButtonVisible?: boolean;
}

type Handlers =
  `on${Extract<IFloatingAction, { label: string }>["label"]}Click`;

type OwnProps = FloatinActionButtonProps &
  IconButtonSharedProps &
  DropdopwnSharedProps;

const FloatingActionButton: React.FC<OwnProps & Handlers> = ({
  icon,
  className,
  actions = [],
  position,
  size = "medium",
  variant = "plain",
  transformOrigin = 0,
  transformOriginX,
  transformOriginY,
  isButtonVisible,
}) => {
  const FloatingTrigger: FC<TriggerProps> = useCallback(
    ({ isOpen, onTrigger }) => (
      <IconButton
        active={isOpen}
        className={s.fab}
        size={size}
        variant={variant}
        onClick={onTrigger}
      >
        {icon}
      </IconButton>
    ),
    [icon, size, variant],
  );

  return (
    <div
      className={buildClassName(
        s.FabContainer,
        s[position],
        s[size],
        className,
      )}
      style={applyTransformOriginStyles(
        transformOrigin,
        transformOriginX,
        transformOriginY,
      )}
    >
      <DropdownMenu
        position={position}
        shouldClose={!isButtonVisible}
        triggerButton={FloatingTrigger}
      >
        {actions.map((action, index) => {
          const key = +action | index;

          switch (action) {
            case "-":
              return <MenuSeparator key={key} size="thin" />;
            case "=":
              return <MenuSeparator key={key} size="thick" />;
            case "==":
              return <MenuSeparator key={key} size="thicker" />;
            default:
              return <ActionButton key={key} {...action} fullWidth />;
          }
        })}
      </DropdownMenu>
    </div>
  );
};

const applyTransformOriginStyles = (
  transformOrigin?: number,
  transformOriginX: number = 0,
  transformOriginY: number = 0,
) => {
  const x = transformOrigin ?? transformOriginX;
  const y = transformOrigin ?? transformOriginY;

  return buildStyle(
    `--transform-origin-x: ${x}px`,
    `--transform-origin-y: ${y}px`,
  );
};

export default memo(FloatingActionButton);
export type { IFloatingAction };
