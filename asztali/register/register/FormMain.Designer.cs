
namespace register
{
    partial class FormMain
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(FormMain));
            this.pictureBoxLogo = new System.Windows.Forms.PictureBox();
            this.panelHeader = new System.Windows.Forms.Panel();
            this.labelRegister = new System.Windows.Forms.Label();
            this.panelFooter = new System.Windows.Forms.Panel();
            this.panelLeft = new System.Windows.Forms.Panel();
            this.labelProductId = new System.Windows.Forms.Label();
            this.comboBoxProductId = new System.Windows.Forms.ComboBox();
            this.labelCategory = new System.Windows.Forms.Label();
            this.labelProduct = new System.Windows.Forms.Label();
            this.comboBoxCategory = new System.Windows.Forms.ComboBox();
            this.comboBoxProduct = new System.Windows.Forms.ComboBox();
            this.labelProductWarning = new System.Windows.Forms.Label();
            this.labelPricePerUnit = new System.Windows.Forms.Label();
            this.labelPricePerUnitDisplay = new System.Windows.Forms.Label();
            this.labelQuantity = new System.Windows.Forms.Label();
            this.numericUpDownQuantity = new System.Windows.Forms.NumericUpDown();
            this.labelSum = new System.Windows.Forms.Label();
            this.labelSumDisplay = new System.Windows.Forms.Label();
            this.checkBoxItemWarning = new System.Windows.Forms.CheckBox();
            this.buttonAddItem = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxLogo)).BeginInit();
            this.panelHeader.SuspendLayout();
            this.panelLeft.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownQuantity)).BeginInit();
            this.SuspendLayout();
            // 
            // pictureBoxLogo
            // 
            this.pictureBoxLogo.Image = global::register.Properties.Resources.Mainlogo;
            this.pictureBoxLogo.Location = new System.Drawing.Point(15, 15);
            this.pictureBoxLogo.Margin = new System.Windows.Forms.Padding(15, 16, 15, 16);
            this.pictureBoxLogo.Name = "pictureBoxLogo";
            this.pictureBoxLogo.Size = new System.Drawing.Size(150, 82);
            this.pictureBoxLogo.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBoxLogo.TabIndex = 1;
            this.pictureBoxLogo.TabStop = false;
            // 
            // panelHeader
            // 
            this.panelHeader.AutoSize = true;
            this.panelHeader.Controls.Add(this.labelRegister);
            this.panelHeader.Controls.Add(this.pictureBoxLogo);
            this.panelHeader.Dock = System.Windows.Forms.DockStyle.Top;
            this.panelHeader.Location = new System.Drawing.Point(0, 0);
            this.panelHeader.Margin = new System.Windows.Forms.Padding(2);
            this.panelHeader.Name = "panelHeader";
            this.panelHeader.Size = new System.Drawing.Size(1924, 113);
            this.panelHeader.TabIndex = 2;
            // 
            // labelRegister
            // 
            this.labelRegister.Font = new System.Drawing.Font("Microsoft Sans Serif", 25F, System.Drawing.FontStyle.Bold);
            this.labelRegister.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.labelRegister.Location = new System.Drawing.Point(183, 2);
            this.labelRegister.Name = "labelRegister";
            this.labelRegister.Size = new System.Drawing.Size(1548, 107);
            this.labelRegister.TabIndex = 2;
            this.labelRegister.Text = "Pénztár ";
            this.labelRegister.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
            // 
            // panelFooter
            // 
            this.panelFooter.Dock = System.Windows.Forms.DockStyle.Bottom;
            this.panelFooter.Location = new System.Drawing.Point(0, 961);
            this.panelFooter.Name = "panelFooter";
            this.panelFooter.Size = new System.Drawing.Size(1924, 100);
            this.panelFooter.TabIndex = 3;
            // 
            // panelLeft
            // 
            this.panelLeft.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(21)))), ((int)(((byte)(21)))), ((int)(((byte)(21)))));
            this.panelLeft.Controls.Add(this.buttonAddItem);
            this.panelLeft.Controls.Add(this.checkBoxItemWarning);
            this.panelLeft.Controls.Add(this.labelSumDisplay);
            this.panelLeft.Controls.Add(this.labelSum);
            this.panelLeft.Controls.Add(this.numericUpDownQuantity);
            this.panelLeft.Controls.Add(this.labelQuantity);
            this.panelLeft.Controls.Add(this.labelPricePerUnitDisplay);
            this.panelLeft.Controls.Add(this.labelPricePerUnit);
            this.panelLeft.Controls.Add(this.labelProductWarning);
            this.panelLeft.Controls.Add(this.comboBoxProduct);
            this.panelLeft.Controls.Add(this.comboBoxCategory);
            this.panelLeft.Controls.Add(this.labelProduct);
            this.panelLeft.Controls.Add(this.labelCategory);
            this.panelLeft.Controls.Add(this.comboBoxProductId);
            this.panelLeft.Controls.Add(this.labelProductId);
            this.panelLeft.Dock = System.Windows.Forms.DockStyle.Left;
            this.panelLeft.Location = new System.Drawing.Point(0, 113);
            this.panelLeft.Name = "panelLeft";
            this.panelLeft.Size = new System.Drawing.Size(500, 848);
            this.panelLeft.TabIndex = 4;
            // 
            // labelProductId
            // 
            this.labelProductId.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.labelProductId.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.labelProductId.Location = new System.Drawing.Point(40, 40);
            this.labelProductId.Margin = new System.Windows.Forms.Padding(0);
            this.labelProductId.Name = "labelProductId";
            this.labelProductId.Size = new System.Drawing.Size(200, 50);
            this.labelProductId.TabIndex = 0;
            this.labelProductId.Text = "Termék azonosító:";
            this.labelProductId.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // comboBoxProductId
            // 
            this.comboBoxProductId.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.Suggest;
            this.comboBoxProductId.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(10)))), ((int)(((byte)(10)))), ((int)(((byte)(10)))));
            this.comboBoxProductId.Font = new System.Drawing.Font("Microsoft Sans Serif", 28F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.comboBoxProductId.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.comboBoxProductId.FormattingEnabled = true;
            this.comboBoxProductId.Location = new System.Drawing.Point(40, 90);
            this.comboBoxProductId.Margin = new System.Windows.Forms.Padding(0);
            this.comboBoxProductId.Name = "comboBoxProductId";
            this.comboBoxProductId.Size = new System.Drawing.Size(420, 50);
            this.comboBoxProductId.TabIndex = 1;
            this.comboBoxProductId.SelectedIndexChanged += new System.EventHandler(this.comboBoxProductId_SelectedIndexChanged);
            // 
            // labelCategory
            // 
            this.labelCategory.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.labelCategory.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.labelCategory.Location = new System.Drawing.Point(40, 160);
            this.labelCategory.Margin = new System.Windows.Forms.Padding(0);
            this.labelCategory.Name = "labelCategory";
            this.labelCategory.Size = new System.Drawing.Size(200, 50);
            this.labelCategory.TabIndex = 2;
            this.labelCategory.Text = "Kategória:";
            this.labelCategory.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // labelProduct
            // 
            this.labelProduct.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.labelProduct.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.labelProduct.Location = new System.Drawing.Point(260, 160);
            this.labelProduct.Margin = new System.Windows.Forms.Padding(0);
            this.labelProduct.Name = "labelProduct";
            this.labelProduct.Size = new System.Drawing.Size(200, 50);
            this.labelProduct.TabIndex = 3;
            this.labelProduct.Text = "Termék:";
            this.labelProduct.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // comboBoxCategory
            // 
            this.comboBoxCategory.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.Suggest;
            this.comboBoxCategory.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(10)))), ((int)(((byte)(10)))), ((int)(((byte)(10)))));
            this.comboBoxCategory.Font = new System.Drawing.Font("Microsoft Sans Serif", 28F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.comboBoxCategory.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.comboBoxCategory.FormattingEnabled = true;
            this.comboBoxCategory.Location = new System.Drawing.Point(40, 210);
            this.comboBoxCategory.Margin = new System.Windows.Forms.Padding(0);
            this.comboBoxCategory.Name = "comboBoxCategory";
            this.comboBoxCategory.Size = new System.Drawing.Size(200, 50);
            this.comboBoxCategory.TabIndex = 4;
            // 
            // comboBoxProduct
            // 
            this.comboBoxProduct.AutoCompleteMode = System.Windows.Forms.AutoCompleteMode.Suggest;
            this.comboBoxProduct.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(10)))), ((int)(((byte)(10)))), ((int)(((byte)(10)))));
            this.comboBoxProduct.Font = new System.Drawing.Font("Microsoft Sans Serif", 28F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.comboBoxProduct.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.comboBoxProduct.FormattingEnabled = true;
            this.comboBoxProduct.Location = new System.Drawing.Point(260, 210);
            this.comboBoxProduct.Margin = new System.Windows.Forms.Padding(0);
            this.comboBoxProduct.Name = "comboBoxProduct";
            this.comboBoxProduct.Size = new System.Drawing.Size(200, 50);
            this.comboBoxProduct.TabIndex = 5;
            // 
            // labelProductWarning
            // 
            this.labelProductWarning.Font = new System.Drawing.Font("Microsoft Sans Serif", 8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.labelProductWarning.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(210)))), ((int)(((byte)(171)))), ((int)(((byte)(42)))));
            this.labelProductWarning.Location = new System.Drawing.Point(260, 260);
            this.labelProductWarning.Margin = new System.Windows.Forms.Padding(0);
            this.labelProductWarning.Name = "labelProductWarning";
            this.labelProductWarning.Size = new System.Drawing.Size(200, 20);
            this.labelProductWarning.TabIndex = 6;
            this.labelProductWarning.Text = "Figyelem, a termék korosztályhoz kötött!";
            this.labelProductWarning.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // labelPricePerUnit
            // 
            this.labelPricePerUnit.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.labelPricePerUnit.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.labelPricePerUnit.Location = new System.Drawing.Point(40, 280);
            this.labelPricePerUnit.Margin = new System.Windows.Forms.Padding(0);
            this.labelPricePerUnit.Name = "labelPricePerUnit";
            this.labelPricePerUnit.Size = new System.Drawing.Size(200, 50);
            this.labelPricePerUnit.TabIndex = 7;
            this.labelPricePerUnit.Text = "Egységár:";
            this.labelPricePerUnit.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // labelPricePerUnitDisplay
            // 
            this.labelPricePerUnitDisplay.Font = new System.Drawing.Font("Microsoft Sans Serif", 20F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.labelPricePerUnitDisplay.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.labelPricePerUnitDisplay.Location = new System.Drawing.Point(160, 300);
            this.labelPricePerUnitDisplay.Margin = new System.Windows.Forms.Padding(0);
            this.labelPricePerUnitDisplay.Name = "labelPricePerUnitDisplay";
            this.labelPricePerUnitDisplay.Size = new System.Drawing.Size(300, 50);
            this.labelPricePerUnitDisplay.TabIndex = 8;
            this.labelPricePerUnitDisplay.Text = "2 000 Ft / Kg";
            this.labelPricePerUnitDisplay.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // labelQuantity
            // 
            this.labelQuantity.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.labelQuantity.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.labelQuantity.Location = new System.Drawing.Point(40, 390);
            this.labelQuantity.Margin = new System.Windows.Forms.Padding(0);
            this.labelQuantity.Name = "labelQuantity";
            this.labelQuantity.Size = new System.Drawing.Size(200, 50);
            this.labelQuantity.TabIndex = 9;
            this.labelQuantity.Text = "Mennyiség:";
            this.labelQuantity.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            this.labelQuantity.Click += new System.EventHandler(this.label2_Click);
            // 
            // numericUpDownQuantity
            // 
            this.numericUpDownQuantity.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(10)))), ((int)(((byte)(10)))), ((int)(((byte)(10)))));
            this.numericUpDownQuantity.DecimalPlaces = 2;
            this.numericUpDownQuantity.Font = new System.Drawing.Font("Microsoft Sans Serif", 28F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.numericUpDownQuantity.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.numericUpDownQuantity.Location = new System.Drawing.Point(40, 440);
            this.numericUpDownQuantity.Margin = new System.Windows.Forms.Padding(0);
            this.numericUpDownQuantity.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
            this.numericUpDownQuantity.Name = "numericUpDownQuantity";
            this.numericUpDownQuantity.Size = new System.Drawing.Size(420, 50);
            this.numericUpDownQuantity.TabIndex = 10;
            this.numericUpDownQuantity.TextAlign = System.Windows.Forms.HorizontalAlignment.Right;
            this.numericUpDownQuantity.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // labelSum
            // 
            this.labelSum.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.labelSum.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.labelSum.Location = new System.Drawing.Point(40, 510);
            this.labelSum.Margin = new System.Windows.Forms.Padding(0);
            this.labelSum.Name = "labelSum";
            this.labelSum.Size = new System.Drawing.Size(200, 50);
            this.labelSum.TabIndex = 11;
            this.labelSum.Text = "Összeg:";
            this.labelSum.TextAlign = System.Drawing.ContentAlignment.MiddleLeft;
            // 
            // labelSumDisplay
            // 
            this.labelSumDisplay.Font = new System.Drawing.Font("Microsoft Sans Serif", 20F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.labelSumDisplay.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.labelSumDisplay.Location = new System.Drawing.Point(160, 530);
            this.labelSumDisplay.Margin = new System.Windows.Forms.Padding(0);
            this.labelSumDisplay.Name = "labelSumDisplay";
            this.labelSumDisplay.Size = new System.Drawing.Size(300, 50);
            this.labelSumDisplay.TabIndex = 12;
            this.labelSumDisplay.Text = "6 000 Ft";
            this.labelSumDisplay.TextAlign = System.Drawing.ContentAlignment.MiddleRight;
            // 
            // checkBoxItemWarning
            // 
            this.checkBoxItemWarning.CheckAlign = System.Drawing.ContentAlignment.MiddleRight;
            this.checkBoxItemWarning.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.checkBoxItemWarning.ForeColor = System.Drawing.Color.FromArgb(((int)(((byte)(210)))), ((int)(((byte)(171)))), ((int)(((byte)(42)))));
            this.checkBoxItemWarning.Location = new System.Drawing.Point(40, 698);
            this.checkBoxItemWarning.Margin = new System.Windows.Forms.Padding(0);
            this.checkBoxItemWarning.Name = "checkBoxItemWarning";
            this.checkBoxItemWarning.Size = new System.Drawing.Size(420, 50);
            this.checkBoxItemWarning.TabIndex = 14;
            this.checkBoxItemWarning.Text = "A tételhez megerősítés szükséges!";
            this.checkBoxItemWarning.UseVisualStyleBackColor = true;
            // 
            // buttonAddItem
            // 
            this.buttonAddItem.AutoSize = true;
            this.buttonAddItem.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(10)))), ((int)(((byte)(125)))), ((int)(((byte)(252)))));
            this.buttonAddItem.Font = new System.Drawing.Font("Microsoft Sans Serif", 16F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(238)));
            this.buttonAddItem.ForeColor = System.Drawing.Color.WhiteSmoke;
            this.buttonAddItem.Location = new System.Drawing.Point(260, 768);
            this.buttonAddItem.Margin = new System.Windows.Forms.Padding(0);
            this.buttonAddItem.Name = "buttonAddItem";
            this.buttonAddItem.Size = new System.Drawing.Size(200, 40);
            this.buttonAddItem.TabIndex = 15;
            this.buttonAddItem.Text = "Tétel hozzáadása";
            this.buttonAddItem.UseVisualStyleBackColor = false;
            // 
            // FormMain
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(46)))), ((int)(((byte)(45)))), ((int)(((byte)(52)))));
            this.ClientSize = new System.Drawing.Size(1924, 1061);
            this.Controls.Add(this.panelLeft);
            this.Controls.Add(this.panelFooter);
            this.Controls.Add(this.panelHeader);
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.Margin = new System.Windows.Forms.Padding(2);
            this.Name = "FormMain";
            this.Text = "Pénztár";
            this.Load += new System.EventHandler(this.FormMain_Load);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBoxLogo)).EndInit();
            this.panelHeader.ResumeLayout(false);
            this.panelLeft.ResumeLayout(false);
            this.panelLeft.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownQuantity)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion
        private System.Windows.Forms.PictureBox pictureBoxLogo;
        private System.Windows.Forms.Panel panelHeader;
        private System.Windows.Forms.Label labelRegister;
        private System.Windows.Forms.Panel panelFooter;
        private System.Windows.Forms.Panel panelLeft;
        private System.Windows.Forms.ComboBox comboBoxProductId;
        private System.Windows.Forms.Label labelProductId;
        private System.Windows.Forms.Label labelProduct;
        private System.Windows.Forms.Label labelCategory;
        private System.Windows.Forms.Label labelProductWarning;
        private System.Windows.Forms.ComboBox comboBoxProduct;
        private System.Windows.Forms.ComboBox comboBoxCategory;
        private System.Windows.Forms.Label labelPricePerUnitDisplay;
        private System.Windows.Forms.Label labelPricePerUnit;
        private System.Windows.Forms.Label labelQuantity;
        private System.Windows.Forms.CheckBox checkBoxItemWarning;
        private System.Windows.Forms.Label labelSumDisplay;
        private System.Windows.Forms.Label labelSum;
        private System.Windows.Forms.NumericUpDown numericUpDownQuantity;
        private System.Windows.Forms.Button buttonAddItem;
    }
}