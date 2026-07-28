import { Pagination as AntPagination } from "antd";

function Pagination({
  currentPage,
  totalPages,
  totalTodos,
  limit,
  onChange,
}) {
  return (
    <div className="mt-8 flex justify-center">
      <AntPagination
        current={currentPage}
        total={totalTodos}
        pageSize={limit}
        showSizeChanger={false}
        onChange={onChange}
      />
    </div>
  );
}

export default Pagination;