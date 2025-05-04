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
        HttpClient client = new HttpClient();
        class Register
        {
            public int spenztar;
        }
        class GepJog
        {
            public bool agepjog;
        }
        async void  SetUpRegister()
        {
            List<Register> registers = new List<Register>();
            try
            {
                HttpResponseMessage response = await client.GetAsync("http://localhost:3000/server/szamla/gepek");
                if (response.IsSuccessStatusCode)
                {
                    string jsonString = await response.Content.ReadAsStringAsync();
                    registers = JsonConvert.DeserializeObject<List<Register>>(jsonString);
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

            int max = 1;
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

        private async void buttonSubmit_Click(object sender, EventArgs e)
        {
            string sId = textBoxUserId.Text;
            int iId;

            if (int.TryParse(sId, out iId))
            {

                try
                {
                    HttpResponseMessage response = await client.GetAsync($"http://localhost:3000/server/alkalmazott/belepes/desktop/{sId}");
                    if (response.IsSuccessStatusCode)
                    {
                        string jsonString = await response.Content.ReadAsStringAsync();
                        List<GepJog> gepjog = JsonConvert.DeserializeObject<List<GepJog>>(jsonString);
                        if (gepjog.Count < 1)
                        {
                            MessageBox.Show("Érvénytelen azonosító! Indok: Nincs ilyen azonosítójú alkalmazott.", "Figyelem!", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                            return;
                        }
                        if (gepjog[0].agepjog)
                        {
                            FormMain main = new FormMain(iId);
                            main.Show();
                            this.Hide();
                        }
                        else
                        {
                            MessageBox.Show("Hozzáférés megtagadva!", "Figyelem!", MessageBoxButtons.OK, MessageBoxIcon.Stop);
                        }
                    }
                    else
                    {
                        MessageBox.Show("Hiba a lekérdezés során!", "Hiba!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    }
                }
                catch (HttpRequestException e2)
                {
                    MessageBox.Show(e2.Message, "Hiba!", MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
            }
            else
            {
                MessageBox.Show("Érvénytelen azonosító! Indok: Karakter nem értelmezhető.", "Figyelem!", MessageBoxButtons.OK, MessageBoxIcon.Warning);
            }
            
        }
    }
}
