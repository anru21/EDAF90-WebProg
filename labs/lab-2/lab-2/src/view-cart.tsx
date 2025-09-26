import { Button } from "./components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import type { Salad } from "./salad";
import { CircleCheckIcon } from "lucide-react";
import { useState } from "react";

type PropsType = { cart: Salad[] };
function ViewCart({ cart }: PropsType) {
  return (
    <>
      <Card className="w-full p-3">
        {cardHead}
        <CardContent>
          <Table>
            {tableHead}
            <TableBody>
              {cart.map((salad, index) => (
                <TableRow key={salad.uuid}>
                  <TableCell className="font-normal">
                    {Object.keys(cart[index].ingredients).join(",")}
                  </TableCell>

                  <TableCell>
                    <div>
                      {cart[index].info().vegan && (
                        <CircleCheckIcon className="text-primary m-auto" />
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      {cart[index].info().lactose && (
                        <CircleCheckIcon className="text-primary m-auto"></CircleCheckIcon>
                      )}
                    </div>
                  </TableCell>

                  <TableCell>
                    <div>
                      {cart[index].info().gluten && (
                        <CircleCheckIcon className="text-primary m-auto"></CircleCheckIcon>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="font-normal text-right tabular-nums">
                    {cart[index].price()} kr
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={4}>Totalt</TableCell>
                <TableCell className="text-right tabular-nums">
                  {cart.reduce((acc, salad) => acc + salad.price(), 0)} kr
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

/*
 * static content, rendered when the file is loaded.
 */
const orderButton = (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      <Button>Skicka beställningen</Button>
    </AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Under utveckling</AlertDialogTitle>
        <AlertDialogDescription>
          Denna funktion implementeras under labb 4.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
const tableHead = (
  <TableHeader>
    <TableRow>
      <TableHead className="font-semibold">Ingredienser</TableHead>
      <TableHead className="font-semibold text-center">Vegan</TableHead>
      <TableHead className="font-semibold text-center">Lactose</TableHead>
      <TableHead className="font-semibold text-center">Gluten</TableHead>
      <TableHead className="font-semibold text-right">Pris</TableHead>
    </TableRow>
  </TableHeader>
);
const cardHead = (
  <CardHeader>
    <CardTitle>Varukorgen</CardTitle>
    <CardDescription>Här listas alla sallader du skapat.</CardDescription>
    <CardAction>{orderButton}</CardAction>
  </CardHeader>
);
export default ViewCart;
