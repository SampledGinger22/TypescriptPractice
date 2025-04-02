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

  const formatPhoneNumber = (phoneNumber: string) => {
    if (phoneNumber.length === 10) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
    } else if (phoneNumber.length === 7) {
      return `${phoneNumber.slice(0, 3)}-${phoneNumber.slice(3)}`;
    }
    return phoneNumber;
  }

  return (
    <main className="m-6">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-center">Solace Advocates</h1>
      <br/>
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-fit w-50%">
        <p className="text-lg font-semibold text-black">Search</p>
        <input className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Searching for:" onChange={onChange} />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={onClick}>
          Reset Search
        </button>
      </form>
      <br />
      <br />
      <table className="min-w-full border-collapse shadow-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2 text-left w-min">First Name</th>
            <th className="border p-2 text-left">Last Name</th>
            <th className="border p-2 text-left">City</th>
            <th className="border p-2 text-left">Degree</th>
            <th className="border p-2 text-left">Specialties</th>
            <th className="border p-2 text-left">Years of Experience</th>
            <th className="border p-2 text-left">Phone Number</th>
          </tr>
        </thead>
        <tbody className="align-top">
          {filteredAdvocates.map((advocate) => {
            return (
              <tr key={advocate.phoneNumber} className="even:bg-gray-100">
                <td className="border p-2">{advocate.firstName ?? null}</td>
                <td className="border p-2">{advocate.lastName ?? null}</td>
                <td className="border p-2">{advocate.city ?? null}</td>
                <td className="border p-2">{advocate.degree ?? null}</td>
                <td className="border p-2 h-min overflow-auto">
                  {advocate.specialties && advocate.specialties.length > 0
                    ? advocate.specialties.map((s, index) => <div key={index}>{s}</div>)
                    : null}
                </td>
                <td className="border p-2">{advocate.yearsOfExperience ?? null}</td>
                <td className="border p-2">{ advocate.phoneNumber ? formatPhoneNumber(advocate.phoneNumber.toString()) :  null}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
