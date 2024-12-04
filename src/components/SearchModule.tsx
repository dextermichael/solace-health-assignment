"use client";
interface Advocate {
    firstName: string;
    lastName: string;
    city: string;
    degree: string;
    specialties: string[];
    yearsOfExperience: number;
    phoneNumber: string;
  }
import {
  Chip,
  Input,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
} from "@nextui-org/react";
import React, { useMemo, useState } from "react";
import { FaRegCircleXmark } from "react-icons/fa6";

export default function SearchModule({ advocates }: { advocates: Advocate[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const filteredAdvocates = useMemo(() => {
   
    if (searchTerm === "") {
      return advocates;
    } else {
      const filteredAdvocates = advocates.filter(
        (advocate: Advocate) =>
          advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.specialties.filter((specialty: String) =>
            specialty.toLocaleLowerCase().includes(searchTerm.toLowerCase())
          ).length > 0 ||
          advocate.yearsOfExperience.toString().includes(searchTerm.toLowerCase())
      );
      return filteredAdvocates;
    }
  } , [searchTerm]);
  const handleSearchTermChange = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const onClick = () => {
    setSearchTerm("");
  };

  const rowsPerPage = 5;

  const pages = Math.ceil(filteredAdvocates.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredAdvocates.slice(start, end);
  }, [page, filteredAdvocates]);

  return (
    <main className="max-w-6xl mx-auto px-3 py-10">
      <div>
        <p className="text-center text-xl font-bold">Find Advocates</p>
        <div className="flex justify-between w-full max-md:flex-col gap-3 items-center">
          <div>
            <h2 className="text-xl font-bold">Advocate List</h2>
          </div>
          <div className="max-w-[300px] w-full">
            <Input
              label="Search"
              className="w-full"
              value={searchTerm}
              onChange={handleSearchTermChange}
              size="sm"
              endContent={
                <>
                  {searchTerm != "" && (
                    <FaRegCircleXmark
                      className="text-xl cursor-pointer"
                      onClick={onClick}
                    />
                  )}
                </>
              }
            />
          </div>
        </div>
        {/* <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button> */}
      </div>
      {searchTerm != "" && <p className="text-sm">Search For : {searchTerm}</p>}
      <Table
        isStriped
        className="mt-5"
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        classNames={{
          wrapper: "min-h-[222px]",
        }}
      >
        <TableHeader>
          <TableColumn key={"First"}>First Name</TableColumn>
          <TableColumn key={"Last"}>Last Name</TableColumn>
          <TableColumn key={"City"}>City</TableColumn>
          <TableColumn key={"Degree"}>Degree</TableColumn>
          <TableColumn key={"Specialties"}>Specialties</TableColumn>
          <TableColumn key={"Years"}>Years of Experience</TableColumn>
          <TableColumn key={"Phone"}>Phone Number</TableColumn>
        </TableHeader>
        <TableBody items={items}>
          {(item: Advocate) => {
            return (
              <TableRow key={item.phoneNumber}>
                <TableCell>{item.firstName}</TableCell>
                <TableCell>{item.lastName}</TableCell>
                <TableCell>{item.city}</TableCell>
                <TableCell>{item.degree}</TableCell>
                <TableCell>
                  <div className="flex gap-2 flex-wrap">
                    {item.specialties.map((s: String , index : number) => (
                      <Chip color="primary" className="" key={index} variant="flat">
                        <Tooltip content={s} className="cursor-pointer"><p className="max-w-[130px] truncate">{s}</p></Tooltip>
                      </Chip>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{item.yearsOfExperience}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
              </TableRow>
            );
          }}
        </TableBody>
      </Table>
    </main>
  );
}
