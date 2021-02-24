"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert("posts", [
			{
				author_id: 1,
				body: "Kadivhumas Polri Irjen Pol Argo Yuwono (tengah) didampingi Karopenmas Brigjen Pol Rusdi Hartono (kiri) dan Kabagpenum Kombes Pol Ahmad Ramadhan menyampaikan rilis barang bukti teroris, di kantor Bareskrim, Mabes Polri, Jakarta, Jumat (18/12/2020). Sebanyak 23 orang tersangka teroris jaringan Jamaah Islamiyah berhasil ditangkap Tim Densus 88 Anti Teror Polri di Lampung beberapa waktu lalu, dan kini mereka berada di Jakarta untuk menjalani pemeriksaan oleh pihak kepolisian. ANTARA FOTO/Sigid Kurniawan/hp.",
				image: "http://res.cloudinary.com/tiyasakbar/image/upload/v1614184192/guqmzddtz35g3dm6xron.jpg",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				author_id: 1,
				body: "Polsek Asemrowo merilis kasus narkoba jenis sabu dengan tersangka M Nasir (33) dan Busiri (44) yang mengedarkan narkoba jenis sabu di dalam gubuk di Sidorame Belakang IV Surabaya, Jawa Timur",
				title: "Tergiur Setiap Hari Dapat Rp 50 Juta, Dua Pria Ini Nekat Jual Sabu",
				image: "http://res.cloudinary.com/tiyasakbar/image/upload/v1614195594/pwuwamo9c6qhtn8enokp.jpg",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				author_id: 2,
				body: "Polisi mengamankan seorang pria berinisial BS (37), warga Desa Patemon, Kecamatan Tanggul, Jember, Jawa Timur. Pasalnya, ia terbukti telah mengonsumsi narkoba jenis sabu di rumahnya. Kapolsek Manyar Iptu Bima Sakti Pria Laksana mengatakan, terungkapnya kasus tersebut berawal saat pelaku mengendarai sepeda motor tercebur ke tambak yang ada di Desa Banjarsari, Kecamatan Manyar, Gresik pada Sabtu (20/2/2021).",
				title: "Gara-gara Tercebur di Tambak, Pria Ini Terungkap Habis Nyabu",
				image: "http://res.cloudinary.com/tiyasakbar/image/upload/v1614195692/mwxchpgn1gp2rajuojtm.jpg",
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		/**
		 * Add commands to revert seed here.
		 *
		 * Example:
		 * await queryInterface.bulkDelete('People', null, {});
		 */
	},
};
