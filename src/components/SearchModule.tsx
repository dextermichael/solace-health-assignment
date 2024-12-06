"use client";
interface Advocate {
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
}
import {
  Chip,
  Input,
  Pagination,
  Select,
  SelectItem,
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

export default function SearchModule() {
  const [searchTerm, setSearchTerm] = useState("");
  const [advocates, setAdvocates] = useState<Advocate[]>([]);
  const [specialties, setSpecialties] = useState<string[]>([]);
  const [specialtyFilter, setSpecialtyFilter] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  React.useEffect(() => {
    async function fetchAdvocates() {
      const response = await fetch("/api/advocates");
      const data = await response.json();
      setAdvocates(data.data);
      const specialtiesList: string[] = [];
      data.data.map((advocate: Advocate) => {
        advocate.specialties.map((specialty: string) => {
          if (!specialtiesList.includes(specialty)) {
            specialtiesList.push(specialty);
          }
        });
      });
      setSpecialties(specialtiesList);
    }
    fetchAdvocates();
  }, []);

  const filteredAdvocates = useMemo(() => {
    if (searchTerm === "" && specialtyFilter.length === 0) {
      return advocates;
    } else {
      const filteredAdvocates = advocates.filter(
        (advocate: Advocate) =>
          searchTerm === "" ||
          advocate.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.degree.toLowerCase().includes(searchTerm.toLowerCase()) ||
          advocate.yearsOfExperience
            .toString()
            .includes(searchTerm.toLowerCase()) ||
          advocate.phoneNumber.toString().includes(searchTerm.toLowerCase())
      );
      return filteredAdvocates.filter((advocate: Advocate) => {
        return (
          specialtyFilter.length === 0 ||
          specialtyFilter.some((specialty: string) =>
            advocate.specialties.includes(specialty)
          )
        );
      });
    }
  }, [searchTerm, advocates, specialtyFilter]);
  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

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
  const removeSpecialtyHandler = (specialty: string) => {
    const remainingSpecialty = specialtyFilter.filter(
      (item: string) => item !== specialty
    );
    setSpecialtyFilter(remainingSpecialty);
  };
  return (
    <main className="max-w-6xl mx-auto px-3 py-10">
      <div>
        <p className="text-center text-xl font-bold">Find Advocates</p>
        <div className="flex justify-between w-full max-md:flex-col gap-3 items-center mt-8">
          <div>
            <h2 className="text-xl font-bold">Advocate List</h2>
          </div>
          <div className="flex max-md:flex-col gap-3 flex-grow justify-end ">
            <div className="max-w-[300px] w-full">
              <Select
                label="Specialty"
                selectionMode="multiple"
                placeholder="Select  Specialties"
                size="sm"
                selectedKeys={specialtyFilter}
                onSelectionChange={(keys) => {
                  const value = Array.from(keys);
                  const selectedKeys: string[] = [];
                  value.map((item) => {
                    selectedKeys.push(item.toString());
                  });
                  setSpecialtyFilter(selectedKeys);
                }}
                renderValue={(items) => "Select  Specialties"}
              >
                {specialties.map((specialty: string) => (
                  <SelectItem key={specialty}>{specialty}</SelectItem>
                ))}
              </Select>
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
        </div>
        {/* <input style={{ border: "1px solid black" }} onChange={onChange} />
        <button onClick={onClick}>Reset Search</button> */}
      </div>
      {searchTerm != "" && (
        <p className="text-sm mt-2">Search For : {searchTerm}</p>
      )}
      {specialtyFilter.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2 items-center">
          <p className="text-sm">Specialty Filter : </p>
          <div className="flex flex-wrap gap-2 ">
            {specialtyFilter.map((item: string) => (
              <Chip key={item}>
                <div className="flex gap-2 items-center">
                  {item}
                  <FaRegCircleXmark
                    className="text-sm cursor-pointer "
                    onClick={() => {
                      removeSpecialtyHandler(item);
                    }}
                  />
                </div>
              </Chip>
            ))}
          </div>
        </div>
      )}
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
                    {item.specialties.map((s: String, index: number) => (
                      <Chip
                        color="primary"
                        className=""
                        key={index}
                        variant="flat"
                      >
                        <Tooltip content={s} className="cursor-pointer">
                          <p className="max-w-[130px] truncate">{s}</p>
                        </Tooltip>
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
