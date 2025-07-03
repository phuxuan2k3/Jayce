import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const createRootElement = (id: string) => {
  const rootContainer = document.createElement("div");
  rootContainer.setAttribute("id", id);
  return rootContainer;
};

const addRootElement = (rootElem: HTMLElement) => {
  document.body.insertBefore(
    rootElem,
    document?.body?.lastElementChild?.nextElementSibling ?? null
  );
};
const usePortal = (id: string) => {
  const rootElemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const existingParent = document.querySelector(`#${id}`);
    const parentElem = existingParent || createRootElement(id);
    if (!existingParent) {
      addRootElement(parentElem as HTMLElement);
    }
    rootElemRef.current && parentElem.appendChild(rootElemRef.current);
    return () => {
      rootElemRef.current && rootElemRef.current.remove();

      if (!parentElem.childElementCount) {
        parentElem.remove();
      }
    };
  }, [id]);
  const getRootElem = () => {
    if (!rootElemRef.current && typeof document !== "undefined") {
      rootElemRef.current = document.createElement("div");
    }
    return rootElemRef.current;
  };

  return getRootElem();
};

interface IPortalProps {
  id?: string;
  children: React.ReactNode;
}

const Portal: React.FC<IPortalProps> = ({ id = "modal", children }) => {
  const target = usePortal(id);
  if (!target) return null;
  return createPortal(<>{children}</>, target);
};

export default Portal;
