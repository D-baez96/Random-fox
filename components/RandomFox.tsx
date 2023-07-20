import { useRef, useEffect, useState } from "react";
import type { ImgHTMLAttributes } from "react";


type LazyImageProps = {
  src: string;
};

type ImageNativeTypes = ImgHTMLAttributes<HTMLImageElement>;

type Props = LazyImageProps & ImageNativeTypes;


export function LazyImage({ src,...imgProps }: Props): JSX.Element {
  const node = useRef<HTMLImageElement >(null);

  const [Currentsrc, setSrc]= useState("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4=")

  useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(entry =>{
        if(entry.isIntersecting){
          setSrc(Currentsrc)
        }
      })
    })
    if(node.current){
      observer.observe(node.current);
    }
    return () =>{
      observer.disconnect()
    }
  },[Currentsrc])


  return (
    <img
      ref = {node}
      src={src}
      {...imgProps}
    />
  );
}
