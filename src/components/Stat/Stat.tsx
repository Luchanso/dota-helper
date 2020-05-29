import React from "react";
import "./stat.css";

type Props = {
  name: string;
  value?: number | string;
};

export function Stat({ name, value }: Props) {
  return (
    <div className="stat">
      {name}: {value}
    </div>
  );
}
