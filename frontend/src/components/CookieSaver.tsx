import React, { useEffect, useRef, ReactNode } from "react";
import { getCookie } from "@/utils/cookies";

interface CookieSaverI {
  children: ReactNode;
  elementId: string;
}

function onBlurCookieSaver(elementId: string) {
  let onBlur = () => {
    let stringValue = (
      document.getElementById(elementId) as
        | HTMLTextAreaElement
        | HTMLInputElement
    ).value;
    document.cookie = `${elementId}=${stringValue}; path=/`;
  };
  return onBlur;
}
const CookieSaver = ({ children, elementId }: CookieSaverI) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedValue = getCookie(elementId);
    if (inputRef.current && savedValue) {
      inputRef.current.value = savedValue;
    }
  }, [elementId]);

  const child = React.Children.only(children);
  return React.cloneElement(child as React.ReactElement<any>, {
    ref: inputRef,
    onBlur: onBlurCookieSaver(elementId),
    id: elementId,
  });
};

export { CookieSaver };
