import { ReactNode } from "react";

export default function Card({ children }: { children: ReactNode }) {
  return (
    <div className="card p-3 mt-5">
      <div className="card-body">{children}</div>
    </div>
  );
}
