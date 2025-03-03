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

namespace register
{
    public partial class authentication : Form
    {
        void SetUpRegister()
        {

        }
        public authentication()
        {
            InitializeComponent();
        }

        private void authentication_Load(object sender, EventArgs e)
        {
            if (new StreamReader("data.rg").ReadToEnd() == "")
            {
                SetUpRegister();
            }
        }
    }
}
