using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.IO;
using System.Net.Http;
using Newtonsoft.Json;

namespace register
{
    public partial class FormMain : Form
    {
        HttpClient client = new HttpClient();
        string baseURL = "http://localhost:3000/server";
        List<CatalogItem> catalog = new List<CatalogItem>();
        List<Item> cart = new List<Item>();
        Int64 employeeId;

        class Employee
        {
            public string anev, amunka;
            public DateTime aszul, abelepes;
        }
        class CatalogItem
        {
            public Int64 tazon;
            public string tnev, tkategoria;
        }

        class Product
        {
            public int tar;
            public string tnev;
            public double tmennyiseg;
            public string tmennyisegiegyseg;
            public bool tkoros;
        }
        class Item
        {
            public Int64 sazon, tazon;
            public double mennyiseg;

            public Item(Int64 tazon, double mennyiseg)
            {
                this.tazon = tazon;
                this.mennyiseg = mennyiseg;
            }
        }

        class Receipt
        {
            public int sazon, spenztar;
            public Int64 selado;
            public string sfizetesimod;
        }


        Employee employee = new Employee();

        async void SetEmployee(int id)
        {
            try
            {
                HttpResponseMessage response = await client.GetAsync(baseURL + $"/alkalmazott/{id}");
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();
                    employee = JsonConvert.DeserializeObject<List<Employee>>(jsonString)[0];
                    MessageBox.Show($"Szia {employee.anev}! Jó újra látni.");
                }
                else
                {
                    MessageBox.Show("Hiba a lekérdezés során!");
                }
            }
            catch (HttpRequestException e)
            {
                MessageBox.Show(e.Message);
            }
        }
        async void SetProductCategories()
        {
            try
            {
                HttpResponseMessage response = await client.GetAsync(baseURL + $"/termek/termeklista/");
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();
                    catalog = JsonConvert.DeserializeObject<List<CatalogItem>>(jsonString);
                }
                else
                {
                    MessageBox.Show("Hiba a lekérdezés során!");
                }
            }
            catch (HttpRequestException e)
            {
                MessageBox.Show(e.Message);
            }
            foreach (var item in catalog.Select(a => a.tkategoria).Distinct())
            {
                comboBoxCategory.Items.Add(item);
            }
            foreach (var item in catalog.Select(a => a.tazon))
            {
                comboBoxProductId.Items.Add(item);
            }
        }

        async void SetProducts(string category)
        {
            try
            {
                HttpResponseMessage response = await client.GetAsync(baseURL + $"/termek/termeklista/");
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();
                    catalog = JsonConvert.DeserializeObject<List<CatalogItem>>(jsonString);
                }
                else
                {
                    MessageBox.Show("Hiba a lekérdezés során!");
                }
            }
            catch (HttpRequestException e)
            {
                MessageBox.Show(e.Message);
            }
            comboBoxProduct.Items.Clear();
            comboBoxProduct.Text = "";
            foreach (var item in catalog.Where(a => a.tkategoria == category).Select(a => a.tnev))
            {
                comboBoxProduct.Items.Add(item);
            }
        }

        async void SetProductId(string product)
        {
            try
            {
                HttpResponseMessage response = await client.GetAsync(baseURL + $"/termek/termeklista/");
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();
                    catalog = JsonConvert.DeserializeObject<List<CatalogItem>>(jsonString);
                }
                else
                {
                    MessageBox.Show("Hiba a lekérdezés során!");
                }
            }
            catch (HttpRequestException e)
            {
                MessageBox.Show(e.Message);
            }
            foreach (var item in catalog.Where(a => a.tnev == product).Select(a => a.tazon))
            {
                comboBoxProductId.Text = item.ToString();
            }
            DisplayProductInfo(Convert.ToInt64(comboBoxProductId.Text));
            CalculateSum(Convert.ToInt64(comboBoxProductId.Text));
        }

        async void DisplayProductInfo(Int64 id)
        {
            Product product = new Product();
            try
            {
                HttpResponseMessage response = await client.GetAsync(baseURL + $"/termek/{id}");
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();
                    product = JsonConvert.DeserializeObject<List<Product>>(jsonString)[0];
                }
                else
                {
                    MessageBox.Show("Hiba a lekérdezés során!");
                }
                if (product.tkoros)
                {
                    labelProductWarning.Show();
                    checkBoxItemWarning.Show();
                    checkBoxItemWarning.Checked = false;
                }
                else
                {
                    labelProductWarning.Hide();
                    checkBoxItemWarning.Hide();
                }
                labelPricePerUnitDisplay.Text = $"{product.tar} Ft / {product.tmennyisegiegyseg}";
                if (product.tmennyisegiegyseg == "db")
                {
                    numericUpDownQuantity.DecimalPlaces = 0;
                }
                else
                {
                    numericUpDownQuantity.DecimalPlaces = 2;
                }

            }
            catch (HttpRequestException e)
            {
                MessageBox.Show(e.Message);
            }
        }

        async void CalculateSum(Int64 id)
        {
            Product product = new Product();
            try
            {
                HttpResponseMessage response = await client.GetAsync(baseURL + $"/termek/{id}");
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();
                    product = JsonConvert.DeserializeObject<List<Product>>(jsonString)[0];
                }
                else
                {
                    MessageBox.Show("Hiba a lekérdezés során!");
                }
                labelSumDisplay.Text = $"{(int)(product.tar * numericUpDownQuantity.Value)} Ft";
            }
            catch (HttpRequestException e)
            {
                MessageBox.Show(e.Message);
            }
        }

        async void CalculateTotal()
        {
            Int64 total = 0;
            bool containsRestricted = false;
            foreach (var item in cart)
            {
                Product product = new Product();
                try
                {
                    HttpResponseMessage response = await client.GetAsync(baseURL + $"/termek/{item.tazon}");
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonString = await response.Content.ReadAsStringAsync();
                        product = JsonConvert.DeserializeObject<List<Product>>(jsonString)[0];
                    }
                    else
                    {
                        MessageBox.Show("Hiba a lekérdezés során!");
                    }
                    total += Convert.ToInt64(product.tar * item.mennyiseg);
                    if (product.tkoros)
                    {
                        containsRestricted = true;
                    }
                }
                catch (HttpRequestException e)
                {
                    MessageBox.Show(e.Message);
                }
            }
            checkBoxFinalWarning.Visible = containsRestricted;
            labelTotal.Text = $"{total} Ft";
            if (radioButtonCard.Checked)
            {
                labelToPayDisplay.Text = $"{total} Ft";
                numericUpDownPayed.Value = total;
                labelChange.Hide();
                labelChangeDisplay.Hide();
            }
            else if (radioButtonCash.Checked)
            {
                labelToPayDisplay.Text = $"{(int) Math.Round((double)total / 5) * 5} Ft";
                labelChange.Show();
                labelChangeDisplay.Show();
                labelChangeDisplay.Text = $"{ (int) numericUpDownPayed.Value - (int) Math.Round((double)total / 5) * 5} Ft";
            }
        }

        async void AddToCart(Item item)
        {
            Product product = new Product();
            try
            {
                HttpResponseMessage response = await client.GetAsync(baseURL + $"/termek/{item.tazon}");
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();
                    product = JsonConvert.DeserializeObject<List<Product>>(jsonString)[0];
                }
                else
                {
                    MessageBox.Show("Hiba a lekérdezés során!");
                }
                cart.Add(item);
                listBoxItems.Items.Add($"{product.tnev}\t{item.mennyiseg} {product.tmennyisegiegyseg} * {product.tar} Ft/{product.tmennyisegiegyseg}\tÖsszesen: {(int)(product.tar * item.mennyiseg)} Ft");
            }
            catch (HttpRequestException e)
            {
                MessageBox.Show(e.Message);
            }
            CalculateTotal();
        }

        async void RemoveLastFromCart()
        {
            if (cart.Count == 0)
            {
                MessageBox.Show("Nincs eltávolítható tétel!", "Figyelem!", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            else
            {
                listBoxItems.Items.RemoveAt(listBoxItems.Items.Count - 1);
                cart.RemoveAt(cart.Count - 1);
                CalculateTotal();
            }
        }

        async void SubmitReceipt()
        {
            Receipt receipt = new Receipt();

            try
            {
                HttpResponseMessage response = await client.GetAsync(baseURL + "/szamla/utolso");
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();
                    receipt.sazon = JsonConvert.DeserializeObject<List<Receipt>>(jsonString)[0].sazon + 1;
                }
                else
                {
                    MessageBox.Show("Hiba a lekérdezés során! 1");
                }
            }
            catch (HttpRequestException e)
            {
                MessageBox.Show(e.Message);
            }

            receipt.selado = employeeId;
            if (radioButtonCard.Checked)
            {
                receipt.sfizetesimod = "kártya";
            }
            else if (radioButtonCash.Checked)
            {
                receipt.sfizetesimod = "készpénz";
            }
            StreamReader sr = new StreamReader("data.rg");
            receipt.spenztar = Convert.ToInt32(sr.ReadLine());
            sr.Close();

            try
            {
                string jsonData = JsonConvert.SerializeObject(receipt);
                StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                HttpResponseMessage response = await client.PostAsync(baseURL + "/szamla", content);

                if (response.IsSuccessStatusCode)
                {
                    MessageBox.Show("Sikeres POST!");
                    
                }
                else
                {
                    MessageBox.Show("Hiba a POST során! 2");
                }
            }
            catch (HttpRequestException e)
            {
                MessageBox.Show(e.Message);
            }

            foreach (var item in cart)
            {
                Item tetel = new Item(item.tazon, item.mennyiseg);
                tetel.sazon = receipt.sazon;
                try
                {
                    string jsonData = JsonConvert.SerializeObject(tetel);
                    StringContent content = new StringContent(jsonData, Encoding.UTF8, "application/json");

                    HttpResponseMessage response = await client.PostAsync(baseURL + "/tetel", content);

                    if (response.IsSuccessStatusCode)
                    {
                        MessageBox.Show("Sikeres POST! 2");

                    }
                    else
                    {
                        MessageBox.Show(jsonData);
                    }
                }
                catch (HttpRequestException e)
                {
                    MessageBox.Show(e.Message);
                }
            }


        }
        public FormMain(int id)
        {
            InitializeComponent();
            SetEmployee(id);
            employeeId = id;
        }
        private void FormMain_Load(object sender, EventArgs e)
        {
            this.FormBorderStyle = FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            labelProductWarning.Hide();
            checkBoxItemWarning.Hide();
            checkBoxFinalWarning.Hide();
            labelChange.Hide();
            labelChangeDisplay.Hide();
            labelPricePerUnitDisplay.Text = "";
            labelSumDisplay.Text = "";
            StreamReader sr = new StreamReader("data.rg");
            labelRegister.Text += sr.ReadLine();
            sr.Close();
            SetProductCategories();

        }

        private void comboBoxCategory_SelectedIndexChanged(object sender, EventArgs e)
        {
            SetProducts(comboBoxCategory.SelectedItem.ToString());
        }

        private void comboBoxProduct_SelectedIndexChanged(object sender, EventArgs e)
        {
            SetProductId(comboBoxProduct.SelectedItem.ToString());
        }

        private void numericUpDownQuantity_ValueChanged(object sender, EventArgs e)
        {
            CalculateSum(Convert.ToInt64(comboBoxProductId.Text));
        }

        private void numericUpDownQuantity_Leave(object sender, EventArgs e)
        {
            CalculateSum(Convert.ToInt64(comboBoxProductId.Text));
        }

        private void numericUpDownQuantity_KeyUp(object sender, KeyEventArgs e)
        {
            CalculateSum(Convert.ToInt64(comboBoxProductId.Text));
        }

        private void buttonAddItem_Click(object sender, EventArgs e)
        {
            if (checkBoxItemWarning.Visible && !checkBoxItemWarning.Checked)
            {
                MessageBox.Show("Hozzá adás előtt megerősítés szükséges!", "Figyelem!", MessageBoxButtons.OKCancel, MessageBoxIcon.Warning);
            }
            else
            {
                AddToCart(new Item(Convert.ToInt64(comboBoxProductId.Text), Convert.ToDouble(numericUpDownQuantity.Value)));
            }
        }

        private void buttonDeleteLastItem_Click(object sender, EventArgs e)
        {
            RemoveLastFromCart();
        }

        private void radioButtonCard_Click(object sender, EventArgs e)
        {
            CalculateTotal();
        }

        private void radioButtonCash_Click(object sender, EventArgs e)
        {
            CalculateTotal();
        }

        private void numericUpDownPayed_ValueChanged(object sender, EventArgs e)
        {
            CalculateTotal();
        }

        private void numericUpDownPayed_KeyUp(object sender, KeyEventArgs e)
        {
            CalculateTotal();
        }

        private void buttonSubmitReceipt_Click(object sender, EventArgs e)
        {
            if (checkBoxFinalWarning.Visible && !checkBoxFinalWarning.Checked)
            {
                MessageBox.Show("Hozzá adás előtt megerősítés szükséges!", "Figyelem!", MessageBoxButtons.OKCancel, MessageBoxIcon.Warning);
            }
            else
            {
                SubmitReceipt();
            }
        }
    }
}
