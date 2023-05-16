import { Content } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import SearchTemplate from "../../SearchTemplate/SearchTemplate";
import axios from "axios";
import { type } from "os";
import { vacancy } from "../../../types/vacancy";
import { CompaniesTypes } from "../../../types/company";
import { BASE_URL } from "../../../utils/constants";
import SideBar from "../../widgets/SideBar/SideBar";
import CompanyPreview from "../../widgets/CompanyPreview/CompanyPreview";
import "./CompaniesPage.css";

const CompaniesPage = () => {
  const [companies, setCompanies] = useState<CompaniesTypes[] | null>(null);

  const fetchCompanies = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/companies`);
      const companies = res.data;
      setCompanies([...companies]);
    } catch (error) {}
  };

  useEffect(() => {
    fetchCompanies();
  }, []);
  const vacancyPageStyles = {
    marginTop: "50px    ",
  };

  return (
    <Content style={vacancyPageStyles}>
      <div className={"vacancies"}>
        <div className={"vacancies__container"}>
          <div className="vacancies__filters">
            <SearchTemplate />
          </div>
          <div className="vacancy-preview">
            {companies?.map((v) => {
              return <CompanyPreview key={v._id} comapany={v} />;
            })}
          </div>
        </div>
      </div>
    </Content>
  );
};

export default CompaniesPage;
