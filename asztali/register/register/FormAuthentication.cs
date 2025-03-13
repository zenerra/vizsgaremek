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
    
    public partial class formAuthentication : Form
    {
        class Register
        {
            public int spenztar;
        }
        async void  SetUpRegister()
        {
            HttpClient client = new HttpClient();
            List<Register> registers = new List<Register>();
            
            try
            {
                HttpResponseMessage response = await client.GetAsync("http://localhost:3000/server/szamla/gepek");
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();
                    registers = JsonConvert.DeserializeObject<List<Register>>(jsonString);//DeserializeObject<List<int>>(jsonString);
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

            int max = 0;
            for (int i = 0; i < registers.Count; i++)
            {
                if (registers[i].spenztar > 1)
                {
                    max = registers[i].spenztar;
                }
            }

            StreamWriter sw = new StreamWriter("data.rg");
            sw.Write(Convert.ToString(max + 1));
            sw.Close();
        }
        public formAuthentication()
        {
            InitializeComponent();
        }

        private void authentication_Load(object sender, EventArgs e)
        {
            this.FormBorderStyle = FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            StreamReader sr = new StreamReader("data.rg");
            if (sr.ReadToEnd() == "")
            {
                sr.Close();
                SetUpRegister();
            }
            else
            {
                sr.Close();
            }
        }
    }
}
