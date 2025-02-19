import React from "react";
import "./CarSpecifications.scss";
import car from "./ProductDetails";

const CarSpecifications = ({ car }) => {
  const specs = [
    { icon: "/icons/Vector.png", label: `${car.horsepower} CH` },
    { icon: "/icons/calendar-days.png", label: car.year },
    { icon: "/icons/Group 33.png", label: `${car.speed} km/h` },
    { icon: "/icons/Wind.png", label: `0-100 : ${car.acceleration}s` },
    { icon: "/icons/tree-pine.png", label: `Crit'air ${car.critair}` },
  ];

  return (
    <div className="car-specifications">
      {specs.map((spec, index) => (
        <div key={index} className="spec-item">
          <img src={spec.icon} alt={spec.label} className="spec-icon" />
          <span className="spec-label">{spec.label}</span>
        </div>
      ))}
    </div>
  );
};

export default CarSpecifications;
