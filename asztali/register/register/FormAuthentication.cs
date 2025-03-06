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
using Newtonsoft.Json.Linq;

namespace register
{
    public partial class formAuthentication : Form
    {
        void SetUpRegister()
        {
            HttpClient client = new HttpClient();
            StreamWriter sw = new StreamWriter("data.rg");



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
