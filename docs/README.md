# โปรเจกต์ Shopping Cart

README นี้อธิบายโครงสร้างและฟังก์ชั่นหลักของอุปกรณ์จัดการสินค้าในระบบ Shopping Cart โดยแบ่งเป็นหลายส่วนดังนี้:

---

## Homepage (page.tsx)

ดึงข้อมูลสินค้า (Fetch) จากไฟล์ `bewellProduct.json` แล้วแสดงผลรายการสินค้า พร้อมช่อง Search และปุ่มเพิ่มสินค้าลงตะกร้า

**cardMap ** มี Type เป็น (Map\<string, DiscountDetail>): เก็บคีย์เป็น `productId` และ detail ของสินค้านั้นโดยจะเก็บข้อมูลสินค้า, จำนวนที่สั่ง, ชนิดของส่วนลดและส่วนลด

  * เมื่อกด Cart:
    * ถ้าใน `cardMap` ยังไม่มี Product นั้น จะตั้งค่า `quantity = 1`
    * ถ้ามีอยู่แล้ว จะเพิ่มจำนวน (`+1`)

**Search Bar**: สำหรับค้นหาตามชื่อสินค้าหรือรหัสสินค้า
**onCartChange**: callback ส่ง `cardMap` ปัจจุบันไปยัง Component `Order`

---

## 🛒 Order Component (Order.tsx)

**หน้าที่**: แสดงหน้าสรุปคำสั่งซื้อทั้งหมด ประกอบด้วย:

* รายการสินค้า
* จำนวนที่สั่ง
* สถานะ "ส่งภายหลัง"
* ปุ่มลบ และแก้ไขจำนวน/สถานะส่งภายหลัง

### Props

* `cartMap: Map<string, DiscountDetail>`
* `onCartChange: (updatedCart: Map<string, DiscountDetail>) => void`

### State

* `items` (Map\<string, DiscountDetail>)
* `sendAfterItems` (Set) เก็บ `productId` ที่เลือก "ส่งภายหลัง"
* dialog states: เปิด/ปิด DeleteDialog, SendAfterDialog

### ฟังก์ชั่นหลัก

* `useEffect` : ซิงก์ `cartMap` จาก props ไปยัง local state `items`
* `handleUpdate(productId, updates)` :

  * อัปเดตจำนวน (`quantity`) หรือรายละเอียดส่วนลด (`discountType`, `discount`)
  * ถ้า `quantity <= 0` จะลบไอเท็มนั้นออก
  * เรียก `onCartChange` เพื่ออัปเดตกลับไปยัง parent

---

## 🧾 CheckoutBill Component (CheckoutBill.tsx)

**หน้าที่**: คำนวนบิลสรุปราคา

### Props

* `items: Map<string, DiscountDetail>`

### คำนวณ

1. **totalPrice** = \sum (price × quantity)
2. **totalDiscount** = \sum (คำนวณส่วนลดจาก `discountType`)
3. **beforeFinalPrice** = totalPrice - totalDiscount
4. **vatPrice** = beforeFinalPrice × 0.07
5. **finalPrice** = beforeFinalPrice + vatPrice
6. **nextBillAmount** (ส่วนลดท้ายบิล) จากการเลือกประเภทส่วนลดท้ายบิล และจำนวน
7. **netPrice** = finalPrice - nextBillAmount

แสดงผล:

* ราคา เบื้องต้น
* รวม Vat 7%
* ส่วนลดท้ายบิล (เลือกเปอร์เซ็นต์/บาท + กรอกจำนวน)
* แลกคะแนน (Placeholder ฿0)
* รวมราคาทั้งหมด (netPrice)

---

## 💳 BuyingProductCard Component (BuyingCard.tsx)

**หน้าที่**: แสดงหน้าตาของสินค้าในรายการคำสั่งซื้อ พร้อมปรับจำนวนและส่วนลด

### Props

* `discountDetail: DiscountDetail` (ข้อมูลสินค้า + จำนวน + ส่วนลด)
* `onChange(updates)` callback สำหรับอัปเดตค่าจำนวนหรือส่วนลด

### โครงสร้าง

* รูปสินค้า (`Image`)
* ชื่อสินค้า, รหัสสินค้า
* แสดงราคาต่อหน่วย และ `InputNumber` สำหรับปรับจำนวน
* Dropdown (`Select`) เลือกประเภทส่วนลด (บาท/เปอร์เซ็นต์)
* `InputNumber` กรอกค่าส่วนลด

---

## 🎴 BuyingCardCover Component (BuyingCardCover.tsx)

**หน้าที่**: ห่อหุ้ม `BuyingProductCard` พร้อมปุ่มจัดการสถานะ "ส่งภายหลัง" และปุ่มลบ

### Props

* `children: React.ReactNode` (ส่วนหลักของไพ่)
* `status: boolean` (สถานะส่งภายหลัง)
* `onUpdate()` เปิด Dialog แก้ไขสถานะ/จำนวน
* `onDelete()` ลบรายการสินค้า

### แสดงผล

* ถ้า `status = true`:

  * ไอคอน Check สีเขียว
  * ปุ่มลบ (Trash)
* ถ้า `status = false`:

  * ปุ่ม Edit (เปิดส่งภายหลัง)
  * ปุ่มลบ
