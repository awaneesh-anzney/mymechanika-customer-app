"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Car,
  Wrench,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Check,
  Printer,
  Download,
} from "lucide-react";

interface InvoiceItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceData {
  invoiceNumber: string;
  from: {
    companyName: string;
    address: string;
    phone: string;
    email: string;
    gstNo: string;
  };
  billTo: {
    customerName: string;
    address: string;
    phone: string;
    vehicleNo: string;
    model: string;
  };
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  cgst: number;
  sgst: number;
  grandTotal: number;
}

interface InvoiceDialogProps {
  children: React.ReactNode;
  invoiceData?: InvoiceData;
}

// Default invoice data based on the images
const defaultInvoiceData: InvoiceData = {
  invoiceNumber: "INV-2024-0847",
  from: {
    companyName: "AutoCare Pro Services",
    address: "123 Service Lane, Motor City, MC 45678",
    phone: "+91 98765 43210",
    email: "service@autocarepro.com",
    gstNo: "27AABCU9603R1ZM",
  },
  billTo: {
    customerName: "Rajesh Kumar",
    address: "456 Park Avenue, Green Valley, GV 12345",
    phone: "+91 87654 32109",
    vehicleNo: "MH 12 AB 1234",
    model: "Honda City 2022",
  },
  invoiceDate: "December 17, 2024",
  dueDate: "December 31, 2024",
  items: [
    {
      id: 1,
      description: "Full Car Service (Premium Package)",
      quantity: 1,
      unitPrice: 4500,
      total: 4500,
    },
    {
      id: 2,
      description: "Engine Oil Change (Synthetic 5W-30)",
      quantity: 4,
      unitPrice: 450,
      total: 1800,
    },
    {
      id: 3,
      description: "Oil Filter Replacement",
      quantity: 1,
      unitPrice: 350,
      total: 350,
    },
    {
      id: 4,
      description: "Air Filter Cleaning & Service",
      quantity: 1,
      unitPrice: 200,
      total: 200,
    },
    {
      id: 5,
      description: "Brake Pad Inspection & Adjustment",
      quantity: 1,
      unitPrice: 800,
      total: 800,
    },
    {
      id: 6,
      description: "AC Gas Top-up & Service",
      quantity: 1,
      unitPrice: 1500,
      total: 1500,
    },
    {
      id: 7,
      description: "Wheel Alignment & Balancing",
      quantity: 1,
      unitPrice: 600,
      total: 600,
    },
  ],
  subtotal: 9750,
  cgst: 877.5,
  sgst: 877.5,
  grandTotal: 11505,
};

const formatCurrency = (amount: number) => {
  return `₹${amount.toFixed(2)}`;
};

export const InvoiceDialog: React.FC<InvoiceDialogProps> = ({
  children,
  invoiceData = defaultInvoiceData,
}) => {
  const [open, setOpen] = React.useState(false);

  const handlePrint = () => {
    if (globalThis.window !== undefined) {
      globalThis.window.print();
    }
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    console.log("Downloading PDF...");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="max-w-6xl w-full max-h-[90vh] overflow-y-auto p-0 bg-background"
        showCloseButton={true}
      >
        <div className="w-full">
          {/* Header - Blue Bar */}
          <div className="bg-secondary text-secondary-foreground px-8 py-5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-background/20 flex items-center justify-center relative">
                <Car className="w-6 h-6 text-secondary-foreground" />
                <Wrench className="w-4 h-4 text-secondary-foreground absolute -bottom-1 -right-1" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-secondary-foreground">
                  {invoiceData.from.companyName}
                </h1>
                <p className="text-sm text-secondary-foreground/80">
                  Professional Auto Care Solutions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-background/20 rounded-lg">
                <Download className="w-4 h-4 text-secondary-foreground" />
                <span className="font-semibold text-secondary-foreground">
                  {invoiceData.invoiceNumber}
                </span>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="px-8 py-8 bg-background space-y-6">
            {/* FROM and BILL TO Sections */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* FROM Section */}
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-3 uppercase">
                  FROM
                </h2>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <p className="font-bold text-foreground">
                    {invoiceData.from.companyName}
                  </p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{invoiceData.from.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>{invoiceData.from.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>{invoiceData.from.email}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    GST No: {invoiceData.from.gstNo}
                  </p>
                </div>
              </div>

              {/* BILL TO Section */}
              <div>
                <h2 className="text-sm font-semibold text-foreground mb-3 uppercase">
                  BILL TO
                </h2>
                <div className="bg-muted rounded-lg p-4 space-y-2">
                  <p className="font-bold text-foreground">
                    {invoiceData.billTo.customerName}
                  </p>
                  <div className="flex items-start gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{invoiceData.billTo.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>{invoiceData.billTo.phone}</span>
                  </div>
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Vehicle No.</span>
                      <span className="font-bold text-foreground">
                        {invoiceData.billTo.vehicleNo}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-muted-foreground">Model</span>
                      <span className="font-bold text-foreground">
                        {invoiceData.billTo.model}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dates Section */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Invoice Date: {invoiceData.invoiceDate}
                </span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Due Date: {invoiceData.dueDate}
                </span>
              </div>
            </div>

            {/* Service Details Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Wrench className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">
                  Service Details
                </h2>
              </div>

              {/* Table */}
              <div className="border border-border rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="bg-secondary text-secondary-foreground grid grid-cols-12 gap-2 px-6 py-4 text-sm font-semibold">
                  <div className="col-span-1 text-center">#</div>
                  <div className="col-span-5">Description</div>
                  <div className="col-span-2 text-center">Qty</div>
                  <div className="col-span-2 text-right">Unit Price</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-border">
                  {invoiceData.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-2 px-6 py-4 text-sm bg-background hover:bg-muted/30 transition-colors"
                    >
                      <div className="col-span-1 text-center text-muted-foreground">
                        {index + 1}
                      </div>
                      <div className="col-span-5 flex items-center gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-foreground">{item.description}</span>
                      </div>
                      <div className="col-span-2 text-center text-muted-foreground">
                        {item.quantity}
                      </div>
                      <div className="col-span-2 text-right text-muted-foreground">
                        {formatCurrency(item.unitPrice)}
                      </div>
                      <div className="col-span-2 text-right font-bold text-foreground">
                        {formatCurrency(item.total)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Summary Section */}
            <div className="flex justify-end">
              <div className="w-full md:w-80 space-y-3">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal:</span>
                  <span className="font-medium">{formatCurrency(invoiceData.subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>CGST (9%):</span>
                  <span className="font-medium">{formatCurrency(invoiceData.cgst)}</span>
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>SGST (9%):</span>
                  <span className="font-medium">{formatCurrency(invoiceData.sgst)}</span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-foreground">
                      Grand Total:
                    </span>
                    <div className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-bold text-xl">
                      {formatCurrency(invoiceData.grandTotal)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground text-center md:text-left">
                Thank you for choosing{" "}
                <span className="font-bold text-secondary">
                  {invoiceData.from.companyName}!
                </span>
              </p>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  onClick={handlePrint}
                  className="gap-2 border-border"
                >
                  <Printer className="w-4 h-4" />
                  Print
                </Button>
                <Button
                  onClick={handleDownloadPDF}
                  className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Download className="w-4 h-4" />
                  Download PDF
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

