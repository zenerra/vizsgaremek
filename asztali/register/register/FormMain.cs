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
        class Employee
        {
            public string anev, amunka;
            public DateTime aszul, abelepes;
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
        }
    }
}
