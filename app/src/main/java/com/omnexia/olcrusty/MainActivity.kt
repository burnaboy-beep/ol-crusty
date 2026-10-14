package com.omnexia.olcrusty

import android.app.Activity
import android.os.Bundle
import android.graphics.Color
import android.view.Gravity
import android.widget.*
import android.content.Context

class MainActivity : Activity() {

    private val backgroundColor = Color.rgb(10, 20, 32)
    private val panelColor = Color.rgb(15, 30, 44)
    private val goldColor = Color.rgb(217, 168, 84)
    private val creamColor = Color.rgb(243, 233, 214)

    private var balance = 0.0
    private var driftboxes = 0

    private lateinit var balanceText: TextView
    private lateinit var content: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        val prefs = getSharedPreferences(
            "ol_crusty_state",
            Context.MODE_PRIVATE
        )

        balance = prefs.getFloat("clawBalance", 0f).toDouble()
        driftboxes = prefs.getInt("driftboxCount", 0)

        showHome()
    }

    private fun saveState() {
        getSharedPreferences(
            "ol_crusty_state",
            Context.MODE_PRIVATE
        ).edit()
            .putFloat("clawBalance", balance.toFloat())
            .putInt("driftboxCount", driftboxes)
            .apply()
    }

    private fun showHome() {
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(24, 32, 24, 24)
            setBackgroundColor(backgroundColor)
        }

        val scroll = ScrollView(this)
        content = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
        }

        scroll.addView(content)
        root.addView(
            scroll,
            LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                0,
                1f
            )
        )

        val title = TextView(this).apply {
            text = "OL' CRUSTY"
            textSize = 28f
            setTextColor(goldColor)
            gravity = Gravity.CENTER
            setPadding(0, 16, 0, 24)
        }

        content.addView(title)

        val subtitle = TextView(this).apply {
            text = "YOUR LITTLE CORNER OF THE OCEAN"
            textSize = 12f
            gravity = Gravity.CENTER
            setTextColor(creamColor)
            setPadding(0, 0, 0, 24)
        }

        content.addView(subtitle)

        balanceText = TextView(this).apply {
            textSize = 25f
            gravity = Gravity.CENTER
            setTextColor(goldColor)
            setPadding(16, 24, 16, 24)
            setBackgroundColor(panelColor)
        }

        content.addView(balanceText)
        updateBalance()

        addSection("YOUR DECK")
        addButton("⚓ Start Fishing") {
            showMessage("Fishing mechanics will be implemented next.")
        }

        addButton("🦀 Your Driftboxes: $driftboxes") {
            showMessage("Your driftbox inventory.")
        }

        addSection("YOUR WALLET")
        addButton("🪙 CLaw Balance") {
            showMessage("Your balance is saved on this device.")
        }

        addSection("MORE")
        addButton("👤 Profile") {
            showMessage("Profile screen is coming next.")
        }

        addButton("🏆 Leaderboard") {
            showMessage("Leaderboard is coming next.")
        }

        addButton("⚙ Settings") {
            showMessage("Settings screen is coming next.")
        }

        setContentView(root)
    }

    private fun addSection(label: String) {
        val heading = TextView(this).apply {
            text = label
            textSize = 16f
            setTextColor(goldColor)
            setPadding(4, 28, 4, 12)
        }
        content.addView(heading)
    }

    private fun addButton(
        label: String,
        action: () -> Unit
    ) {
        val button = Button(this).apply {
            text = label
            textSize = 15f
            setTextColor(creamColor)
            setBackgroundColor(panelColor)
            isAllCaps = false
            setOnClickListener { action() }
        }

        content.addView(
            button,
            LinearLayout.LayoutParams(
                LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.WRAP_CONTENT
            ).apply {
                bottomMargin = 8
            }
        )
    }

    private fun updateBalance() {
        balanceText.text = String.format(
            java.util.Locale.US,
            "%.2f CLAW",
            balance
        )
    }

    private fun showMessage(message: String) {
        Toast.makeText(
            this,
            message,
            Toast.LENGTH_SHORT
        ).show()
    }
}
