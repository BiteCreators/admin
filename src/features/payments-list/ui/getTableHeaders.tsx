import { SortStore, TableSortButton } from "@/entities/sort";
import { TableHeader } from "@byte-creators/ui-kit";
import { PAYMENTS_SORT_BY } from "../lib/types";

export const getTableHeaders = (sortStore: SortStore<typeof PAYMENTS_SORT_BY>): TableHeader[] => {
  return [
    {
      name: "Username",
      sort: <TableSortButton sortStore={sortStore} sortBy={PAYMENTS_SORT_BY.USER_NAME} />
    },
    {
      name: "Date added",
      sort: <TableSortButton sortStore={sortStore} sortBy={PAYMENTS_SORT_BY.CREATED_AT} />
    },
    {
      name: "Amount,$",
      sort: <TableSortButton sortStore={sortStore} sortBy={PAYMENTS_SORT_BY.AMOUNT} />
    },
    {
      name: "Subscription",
    },
    {
      name: "Payment method",
      sort: <TableSortButton sortStore={sortStore} sortBy={PAYMENTS_SORT_BY.PAYMENT_METHOD} />
    },
  ]
}


