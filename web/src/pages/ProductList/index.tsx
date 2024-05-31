import {
  Button,
  Card,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchBar from "../../components/SearchBar";
import { Product } from "../../models/product";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/product";
import SortIndicator from "../../components/SortIndicator";
import { sortOrder as sortOrderType } from "../../types";

interface ProductListInput {}

type sortBy = "name" | "brand";

const ProductList: React.FC<ProductListInput> = () => {
  const [searchKey, setSearchKey] = useState("");
  const [sortOrder, setSortOrder] = useState<sortOrderType>("ASC");
  const [sortBy, setSortBy] = useState<sortBy>("name");
  const [pageSize, setPageSize] = useState<number>(20);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const navigate = useNavigate();

  const { data, isFetching } = useQuery<{
    products: Product[];
    total: number;
  }>({
    queryKey: ["products", pageNumber, pageSize, searchKey, sortOrder, sortBy],
    queryFn: () =>
      getProducts(pageNumber, pageSize, searchKey, sortOrder, sortBy),
  });

  const changePage = (
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    selectedPage: number
  ) => {
    setPageNumber(selectedPage + 1);
  };

  return (
    <Card
      variant="outlined"
      className="max-w-screen-xl min-h-screen px-5 mx-auto"
    >
      <SearchBar search={setSearchKey} />
      <div className="mt-10 mb-8 h-full">
        {isFetching ? (
          <div className="text-xl text-center">Fetching products...</div>
        ) : null}
        {data ? (
          <>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <div
                        className={`flex inline-block ${
                          sortBy !== "name" ? "cursor-pointer" : ""
                        }`}
                        onClick={() => {
                          if (sortBy === "name") return;
                          setSortBy("name");
                        }}
                      >
                        <div>Name</div>
                        {sortBy === "name" && (
                          <SortIndicator
                            sortOrder={sortOrder}
                            changeSortOrder={setSortOrder}
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div
                        className={`flex justify-center ${
                          sortBy !== "brand" ? "cursor-pointer" : ""
                        }`}
                        onClick={() => {
                          if (sortBy === "brand") return;
                          setSortBy("brand");
                        }}
                      >
                        <div>Brand</div>
                        {sortBy === "brand" && (
                          <SortIndicator
                            sortOrder={sortOrder}
                            changeSortOrder={setSortOrder}
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell align="center">Upc12 Number</TableCell>
                    <TableCell align="center"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.products.map((product) => (
                    <TableRow
                      key={product.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="product">
                        {product.name}
                      </TableCell>
                      <TableCell align="center">{product.brand}</TableCell>
                      <TableCell align="center">
                        {product.upc12Number}
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          onClick={() => navigate(`./${product.id}`)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[1, 2, 20]}
              component="div"
              count={data.total}
              rowsPerPage={pageSize}
              page={pageNumber - 1}
              onPageChange={changePage}
              onRowsPerPageChange={(e) => setPageSize(+e.target.value)}
            />{" "}
          </>
        ) : null}
      </div>
    </Card>
  );
};

export default ProductList;
