import { useMobile } from "../../../hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./drawer";

interface ModalProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface ModalTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

interface ModalContentProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

interface ModalDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const Modal = ({ children, open, onOpenChange }: ModalProps) => {
  const { isMobile } = useMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        {children}
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog>
  );
};

const ModalTrigger = ({ asChild, children }: ModalTriggerProps) => {
  const { isMobile } = useMobile();

  if (isMobile) {
    return <DrawerTrigger asChild={asChild}>{children}</DrawerTrigger>;
  }

  return <DialogTrigger asChild={asChild}>{children}</DialogTrigger>;
};

const ModalContent = ({ children, className }: ModalContentProps) => {
  const { isMobile } = useMobile();

  if (isMobile) {
    return <DrawerContent className={className}>{children}</DrawerContent>;
  }

  return <DialogContent className={className}>{children}</DialogContent>;
};

const ModalHeader = ({ children, className }: ModalHeaderProps) => {
  const { isMobile } = useMobile();

  if (isMobile) {
    return <DrawerHeader className={className}>{children}</DrawerHeader>;
  }

  return <DialogHeader className={className}>{children}</DialogHeader>;
};

const ModalTitle = ({ children, className }: ModalTitleProps) => {
  const { isMobile } = useMobile();

  if (isMobile) {
    return <DrawerTitle className={className}>{children}</DrawerTitle>;
  }

  return <DialogTitle className={className}>{children}</DialogTitle>;
};

const ModalDescription = ({ children, className }: ModalDescriptionProps) => {
  const { isMobile } = useMobile();

  if (isMobile) {
    return (
      <DrawerDescription className={className}>{children}</DrawerDescription>
    );
  }

  return (
    <DialogDescription className={className}>{children}</DialogDescription>
  );
};

Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;

export { Modal };
