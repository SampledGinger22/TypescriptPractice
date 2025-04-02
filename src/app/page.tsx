"use client";

import { useEffect, useState } from "react";
import AdvocateDTO from "./api/dto/AdvocateDTO";

export default function Home() {
  const [advocates, setAdvocates] = useState<AdvocateDTO[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<AdvocateDTO[]>([]);

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: any) => {
    const searchTerm: string = e.target.value.toLowerCase();

    let searchTermById = document.getElementById("search-term");
    if (searchTermById) {
      searchTermById.innerHTML = searchTerm;
    }

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName?.toLowerCase().includes(searchTerm) ||
        advocate.lastName?.toLowerCase().includes(searchTerm) ||
        advocate.city?.toLowerCase().includes(searchTerm) ||
        advocate.degree?.toLowerCase().includes(searchTerm) ||
        advocate.specialties?.some((specialty) => specialty.toLowerCase().includes(searchTerm)) ||
        advocate.yearsOfExperience?.toString().includes(searchTerm)
      );
    });

    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(JSON.stringify(advocates));
    setFilteredAdvocates(advocates);
  };

  return (
    <main style={{ margin: "24px" }}>
      <h1>Solace Advocates</h1>
      <br />
      <br />
      <div>
        <p>Search</p>
        <p>
          Searching for: <span id="search-term"></span>
        </p>
        <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button>
      </div>
      <br />
      <br />
      <table>
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>City</th>
          <th>Degree</th>
          <th>Specialties</th>
          <th>Years of Experience</th>
          <th>Phone Number</th>
        </thead>
        <tbody>
          {filteredAdvocates.map((advocate) => {
            return (
              <tr>
                <td>{advocate.firstName ?? null}</td>
                <td>{advocate.lastName ?? null}</td>
                <td>{advocate.city ?? null}</td>
                <td>{advocate.degree ?? null}</td>
                <td>
                  {advocate.specialties && advocate.specialties.length > 0 ? (
                    advocate.specialties.map((s) => <div>{s}</div>)
                  ) : null}
                </td>
                <td>{advocate.yearsOfExperience ?? null}</td>
                <td>{advocate.phoneNumber ?? null}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
