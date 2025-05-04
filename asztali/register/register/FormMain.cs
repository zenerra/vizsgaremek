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
            public Int64 tazon;
            public double mennyiseg;

            public Item(Int64 tazon, double mennyiseg)
            {
                this.tazon = tazon;
                this.mennyiseg = mennyiseg;
            }
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
        }
        public FormMain(int id)
        {
            InitializeComponent();
            SetEmployee(id);
        }
        private void FormMain_Load(object sender, EventArgs e)
        {
            this.FormBorderStyle = FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            labelProductWarning.Hide();
            checkBoxItemWarning.Hide();
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
    }
}
