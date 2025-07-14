"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Advocate } from "@/db/schema";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
        setFilteredAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;

    console.log("filtering advocates...");
    const filteredAdvocates = advocates.filter((advocate) => {
      return (
        advocate.firstName.includes(term) ||
        advocate.lastName.includes(term) ||
        advocate.city.includes(term) ||
        advocate.degree.includes(term) ||
        advocate.specialties.includes(term) ||
        advocate.yearsOfExperience.toString().includes(term)
      );
    });

    setSearchTerm(term);
    setFilteredAdvocates(filteredAdvocates);
  };

  const onClick = () => {
    console.log(advocates);
    setFilteredAdvocates(advocates);
  };

  return (
    <main className="container pt-8">
      <h1 className="text-4xl mb-12">Solace Advocates</h1>
      <div className="mb-12">
        <h2 className="text-2xl mb-4">Search</h2>
        <div className="mb-2">
          Searching for: {searchTerm}
        </div>
        <div className="flex gap-4">
          <Input className="max-w-80" placeholder="Search" onChange={onChange} value={searchTerm} />
          <Button onClick={onClick}>Reset Search</Button>
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Degree</TableHead>
            <TableHead>Specialties</TableHead>
            <TableHead>Years of Experience</TableHead>
            <TableHead>Phone Number</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredAdvocates.map((advocate) => {
            return (
              <TableRow key={advocate.id}>
                <TableCell>{advocate.firstName}</TableCell>
                <TableCell>{advocate.lastName}</TableCell>
                <TableCell>{advocate.city}</TableCell>
                <TableCell>{advocate.degree}</TableCell>
                <TableCell>
                  {advocate.specialties.map((s, idx) => (
                    <div key={idx}>{s}</div>
                  ))}
                </TableCell>
                <TableCell>{advocate.yearsOfExperience}</TableCell>
                <TableCell>{advocate.phoneNumber}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
