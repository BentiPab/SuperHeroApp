import { Container } from "react-bootstrap";
import Pagination from "react-bootstrap/Pagination";

const PaginationHeroes = ({
  itemsCount,
  pageSize,
  onPageChange,
  currentPage,
}) => {
  let active = currentPage;
  const pagesCount = Math.ceil(itemsCount / pageSize);
  let items = [];
  for (let page = 1; page <= pagesCount; page++) {
    items.push(
      <Pagination.Item
        key={page}
        onClick={() => onPageChange(page)}
        active={page === active}
      >
        {page}
      </Pagination.Item>
    );
  }
  return (
    <Container className="justify-content-md-center ">
      <Pagination className="pagination-container" size="sm">
        {items}
      </Pagination>
    </Container>
  );
};

export default PaginationHeroes;
