import { MenuProps } from "antd";
import { Link } from "react-router-dom";

export const occupiedOptions = [
  {
    textContent: "-",
    value: "default",
  },
  {
    textContent: "Полная занятость",
    value: "full-time",
  },
  {
    textContent: "Неполная занятость",
    value: "part-time",
  },
  {
    textContent: "Временная занятость",
    value: "temporary",
  },
  {
    textContent: "Контрактная занятость",
    value: "contract",
  },
  {
    textContent: "Фриланс",
    value: "freelance",
  },
];



export const BASE_URL = "http://localhost:3000/api";

export const directionOptions = [
  {
    textContent: "-",
    value: "default",
  },
  {
    textContent: "Разработка",
    value: "SoftwareDevelopment",
  },
  {
    textContent: "Тестирование",
    value: "QualityAssurance",
  },
  {
    textContent: "Аналитика",
    value: "Analytics",
  },
  {
    textContent: "Дизайн",
    value: "Design",
  },
  {
    textContent: "Менеджмент",
    value: "Management",
  },
  {
    textContent: "Информационная безопасность",
    value: "InformationSecurity",
  },
  {
    textContent: "Администрирование",
    value: "Administration",
  },
  {
    textContent: "Поддержка",
    value: "Support",
  },
  {
    textContent: "Маркетинг",
    value: "Marketing",
  },
  {
    textContent: "Контент",
    value: "Content",
  },
  {
    textContent: "Продажи",
    value: "Sales",
  },
  {
    textContent: "HR",
    value: "Human Resources",
  },
  {
    textContent: "Офис",
    value: "Office",
  },
];

export const qualyOptions = [
  {
    textContent: "-",
    value: "default",
  },
  {
    textContent: "Стажёр",
    value: "intern",
  },
  {
    textContent: "Младший",
    value: "junior",
  },
  {
    textContent: "Средний",
    value: "middle",
  },
  {
    textContent: "Старший",
    value: "senior",
  },
  {
    textContent: "Ведущий",
    value: "lead",
  },
];
