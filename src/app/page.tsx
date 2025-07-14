"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Advocate } from "@/db/schema";
import { ChangeEvent, useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    console.log("fetching advocates...");
    const params = new URLSearchParams();
    params.append("search", searchTerm);
    params.append("page", page.toString());
    fetch(`/api/advocates?${params}`).then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.advocates);
        setPageCount(jsonResponse.pagination.pageCount);
      });
    });
  }, [searchTerm, page]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;

    console.log("filtering advocates...");
    setSearchTerm(term);
    setPage(1);
  };

  const onClick = () => {
    setSearchTerm('');
  };

  const onClickNext = () => {
    setPage((currentPage) => {
      return Math.min(currentPage + 1, pageCount)
    })
  };
  const onClickPrev = () => {
    setPage((currentPage) => {
      return Math.max(currentPage - 1, 0)
    })
  };
  const onClickPage = (page: number) => {
    setPage(page)
  }

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
      <Table className="mb-8">
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
          {advocates.map((advocate) => {
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
      <Pagination className="mb-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={onClickPrev} />
        </PaginationItem>
        {new Array(pageCount).fill(undefined).map((_, idx) => 
          <PaginationItem key={idx}>
            <PaginationLink  href="#" isActive={page === idx + 1} onClick={() => onClickPage(idx + 1)}>{idx + 1}</PaginationLink>
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationNext href="#" onClick={onClickNext}/>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
    </main>
  );
}
